using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain.Portal.Entities;
using CustomerPortal.Api.Data;

namespace CustomerPortal.Api.Controllers;

[ApiController]
[Route("api/v1/customers")]
public class CustomersController : ControllerBase
{
    private readonly PortalDbContext _db;
    public CustomersController(PortalDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? status, [FromQuery] string? search, 
        [FromQuery] int page = 1, [FromQuery] int limit = 20)
    {
        var query = _db.Customers.AsQueryable();
        if (!string.IsNullOrEmpty(status)) query = query.Where(c => c.Status == status);
        if (!string.IsNullOrEmpty(search)) query = query.Where(c => c.Name.Contains(search) || c.Alias.Contains(search));
        var total = await query.CountAsync();
        var items = await query.OrderByDescending(c => c.CreatedAtUtc).Skip((page-1)*limit).Take(limit).ToListAsync();
        return Ok(new { items, total, page, limit });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var customer = await _db.Customers.Include(c => c.Subscriptions).Include(c => c.Invoices)
            .FirstOrDefaultAsync(c => c.Id == id);
        if (customer == null) return NotFound();
        return Ok(customer);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Customer dto)
    {
        if (await _db.Customers.AnyAsync(c => c.Alias == dto.Alias))
            return Conflict(new { message = "Alias already exists" });
        dto.Id = Guid.NewGuid();
        _db.Customers.Add(dto);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }

    [HttpPatch("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Customer dto)
    {
        var customer = await _db.Customers.FindAsync(id);
        if (customer == null) return NotFound();
        if (dto.Name != null) customer.Name = dto.Name;
        if (dto.ContactEmail != null) customer.ContactEmail = dto.ContactEmail;
        if (dto.ContactPhone != null) customer.ContactPhone = dto.ContactPhone;
        customer.ModifiedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(customer);
    }

    [HttpPost("{id:guid}/suspend")]
    public async Task<IActionResult> Suspend(Guid id)
    {
        var customer = await _db.Customers.FindAsync(id);
        if (customer == null) return NotFound();
        customer.Status = "suspended";
        customer.ModifiedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(customer);
    }
}

[ApiController]
[Route("api/v1/subscriptions")]
public class SubscriptionsController : ControllerBase
{
    private readonly PortalDbContext _db;
    public SubscriptionsController(PortalDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] Guid? customerId, [FromQuery] string? status,
        [FromQuery] int page = 1, [FromQuery] int limit = 20)
    {
        var query = _db.Subscriptions.Include(s => s.Customer).Include(s => s.Plan).AsQueryable();
        if (customerId.HasValue) query = query.Where(s => s.CustomerId == customerId.Value);
        if (!string.IsNullOrEmpty(status)) query = query.Where(s => s.Status == status);
        var total = await query.CountAsync();
        var items = await query.OrderByDescending(s => s.CreatedAtUtc).Skip((page-1)*limit).Take(limit).ToListAsync();
        return Ok(new { items, total, page, limit });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var sub = await _db.Subscriptions
            .Include(s => s.Customer).Include(s => s.Plan).Include(s => s.License)
            .Include(s => s.SubscriptionPermissions).Include(s => s.SubscriptionLimits)
            .Include(s => s.Invoices).Include(s => s.Amendments)
            .FirstOrDefaultAsync(s => s.Id == id);
        if (sub == null) return NotFound();
        return Ok(sub);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Subscription dto)
    {
        dto.Id = Guid.NewGuid();
        if (dto.IsTrial && dto.TrialEndsAt.HasValue) dto.Status = "active";
        _db.Subscriptions.Add(dto);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }

    [HttpPost("{id:guid}/activate")]
    public async Task<IActionResult> Activate(Guid id)
    {
        var sub = await _db.Subscriptions.FindAsync(id);
        if (sub == null) return NotFound();
        sub.Status = "active";
        sub.StartDate = DateTime.UtcNow;
        sub.ModifiedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(sub);
    }

    [HttpPost("{id:guid}/suspend")]
    public async Task<IActionResult> Suspend(Guid id)
    {
        var sub = await _db.Subscriptions.FindAsync(id);
        if (sub == null) return NotFound();
        sub.Status = "suspended";
        sub.ModifiedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(sub);
    }

    [HttpPost("{id:guid}/resume")]
    public async Task<IActionResult> Resume(Guid id)
    {
        var sub = await _db.Subscriptions.FindAsync(id);
        if (sub == null) return NotFound();
        sub.Status = "active";
        sub.ModifiedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(sub);
    }

    [HttpPost("{id:guid}/cancel")]
    public async Task<IActionResult> Cancel(Guid id)
    {
        var sub = await _db.Subscriptions.FindAsync(id);
        if (sub == null) return NotFound();
        sub.Status = "cancelled";
        sub.ModifiedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(sub);
    }
}

[ApiController]
[Route("api/v1/invoices")]
public class InvoicesController : ControllerBase
{
    private readonly PortalDbContext _db;
    public InvoicesController(PortalDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] Guid? customerId, [FromQuery] string? status,
        [FromQuery] int page = 1, [FromQuery] int limit = 20)
    {
        var query = _db.Invoices.Include(i => i.Customer).Include(i => i.Items).AsQueryable();
        if (customerId.HasValue) query = query.Where(i => i.CustomerId == customerId.Value);
        if (!string.IsNullOrEmpty(status)) query = query.Where(i => i.Status == status);
        var total = await query.CountAsync();
        var items = await query.OrderByDescending(i => i.CreatedAtUtc).Skip((page-1)*limit).Take(limit).ToListAsync();
        return Ok(new { items, total, page, limit });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var inv = await _db.Invoices.Include(i => i.Customer).Include(i => i.Items)
            .Include(i => i.Amendments).FirstOrDefaultAsync(i => i.Id == id);
        if (inv == null) return NotFound();
        return Ok(inv);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Invoice dto)
    {
        dto.Id = Guid.NewGuid();
        var count = await _db.Invoices.CountAsync();
        dto.Number = $"INV-{(count+1):D6}";
        _db.Invoices.Add(dto);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }

    [HttpPost("{id:guid}/approve")]
    public async Task<IActionResult> Approve(Guid id)
    {
        var inv = await _db.Invoices.FindAsync(id);
        if (inv == null) return NotFound();
        inv.Status = "paid";
        inv.PaidAt = DateTime.UtcNow;
        inv.ModifiedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(inv);
    }

    [HttpPost("{id:guid}/reject")]
    public async Task<IActionResult> Reject(Guid id)
    {
        var inv = await _db.Invoices.FindAsync(id);
        if (inv == null) return NotFound();
        inv.Status = "void";
        inv.ModifiedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(inv);
    }
}

[ApiController]
[Route("api/v1/invoices/{invoiceId:guid}/payments")]
public class PaymentsController : ControllerBase
{
    private readonly PortalDbContext _db;
    public PaymentsController(PortalDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Register(Guid invoiceId, [FromBody] Payment dto)
    {
        dto.Id = Guid.NewGuid();
        dto.InvoiceId = invoiceId;
        _db.Payments.Add(dto);
        await _db.SaveChangesAsync();
        return Ok(dto);
    }

    [HttpGet]
    public async Task<IActionResult> GetByInvoice(Guid invoiceId)
    {
        var payments = await _db.Payments.Where(p => p.InvoiceId == invoiceId).ToListAsync();
        return Ok(payments);
    }
}

[ApiController]
[Route("api/v1/subscriptions/{subscriptionId:guid}/license")]
public class LicensesController : ControllerBase
{
    private readonly PortalDbContext _db;
    public LicensesController(PortalDbContext db) => _db = db;

    [HttpPost("generate")]
    public async Task<IActionResult> Generate(Guid subscriptionId, [FromBody] License dto)
    {
        var sub = await _db.Subscriptions.FindAsync(subscriptionId);
        if (sub == null) return NotFound();
        
        var license = await _db.Licenses.FirstOrDefaultAsync(l => l.SubscriptionId == subscriptionId);
        if (license == null)
        {
            license = new License { Id = Guid.NewGuid(), SubscriptionId = subscriptionId, CustomerId = sub.CustomerId };
            _db.Licenses.Add(license);
        }
        license.GrantedPermissions = dto.GrantedPermissions;
        license.GrantedLimits = dto.GrantedLimits;
        license.ExpiresAt = dto.ExpiresAt;
        license.LastPushedAt = DateTime.UtcNow;
        license.LicenseKey = $"LCS-{subscriptionId.ToString("N")[..8].ToUpper()}-{DateTime.UtcNow.Ticks.ToString("X")[..8]}";
        license.ModifiedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(license);
    }

    [HttpGet]
    public async Task<IActionResult> GetBySubscription(Guid subscriptionId)
    {
        var license = await _db.Licenses.FirstOrDefaultAsync(l => l.SubscriptionId == subscriptionId);
        if (license == null) return NotFound();
        return Ok(license);
    }
}

[ApiController]
[Route("api/v1/auth")]
public class AuthController : ControllerBase
{
    private readonly PortalDbContext _db;
    private readonly IConfiguration _config;
    public AuthController(PortalDbContext db, IConfiguration config) { _db = db; _config = config; }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _db.PortalUsers.FirstOrDefaultAsync(u => u.Username == request.Username);
        if (user == null || user.Status != "active") return Unauthorized();
        
        var hash = Convert.ToHexString(System.Security.Cryptography.SHA256.HashData(
            System.Text.Encoding.UTF8.GetBytes(request.Password))).ToLower();
        if (user.PasswordHash != hash) return Unauthorized();

        var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var key = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(_config.GetValue<string>("Jwt:Secret") ?? "pishgaman-portal-jwt-secret-dev-key-2024"));
        var token = tokenHandler.CreateToken(new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor
        {
            Subject = new System.Security.Claims.ClaimsIdentity(new[] {
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.NameIdentifier, user.Id.ToString()),
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, user.Username)
            }),
            Expires = DateTime.UtcNow.AddHours(24),
            SigningCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(key, 
                Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256)
        });
        
        return Ok(new { accessToken = tokenHandler.WriteToken(token), user = new { user.Id, user.Username, user.DisplayName, user.Email } });
    }

    public record LoginRequest(string Username, string Password);
}

[ApiController]
[Route("api/v1/provisioning")]
public class ProvisioningController : ControllerBase
{
    private readonly PortalDbContext _db;
    public ProvisioningController(PortalDbContext db) => _db = db;

    [HttpPost("trigger")]
    public async Task<IActionResult> Trigger([FromBody] ProvisioningRequest dto)
    {
        dto.Id = Guid.NewGuid();
        dto.Status = "pending";
        _db.ProvisioningRequests.Add(dto);
        await _db.SaveChangesAsync();
        return Ok(dto);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? status, [FromQuery] int page = 1, [FromQuery] int limit = 20)
    {
        var query = _db.ProvisioningRequests.AsQueryable();
        if (!string.IsNullOrEmpty(status)) query = query.Where(r => r.Status == status);
        var total = await query.CountAsync();
        var items = await query.OrderByDescending(r => r.CreatedAtUtc).Skip((page-1)*limit).Take(limit).ToListAsync();
        return Ok(new { items, total, page, limit });
    }
}

[ApiController]
[Route("api/v1/audit-logs")]
public class AuditLogsController : ControllerBase
{
    private readonly PortalDbContext _db;
    public AuditLogsController(PortalDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> Query([FromQuery] Guid? actorId, [FromQuery] Guid? entityId,
        [FromQuery] DateTime? from, [FromQuery] DateTime? to, [FromQuery] int page = 1, [FromQuery] int limit = 50)
    {
        var query = _db.AuditLogs.AsQueryable();
        if (actorId.HasValue) query = query.Where(a => a.ActorUserId == actorId.Value);
        if (entityId.HasValue) query = query.Where(a => a.EntityId == entityId.Value);
        if (from.HasValue) query = query.Where(a => a.CreatedAtUtc >= from.Value);
        if (to.HasValue) query = query.Where(a => a.CreatedAtUtc <= to.Value);
        var total = await query.CountAsync();
        var items = await query.OrderByDescending(a => a.CreatedAtUtc).Skip((page-1)*limit).Take(limit).ToListAsync();
        return Ok(new { items, total, page, limit });
    }

    [HttpPost]
    public async Task<IActionResult> Log([FromBody] AuditLog dto)
    {
        dto.Id = Guid.NewGuid();
        _db.AuditLogs.Add(dto);
        await _db.SaveChangesAsync();
        return Ok(dto);
    }
}

[ApiController]
[Route("api/v1/portal-users")]
public class PortalUsersController : ControllerBase
{
    private readonly PortalDbContext _db;
    public PortalUsersController(PortalDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _db.PortalUsers.OrderBy(u => u.DisplayName).ToListAsync();
        return Ok(users);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PortalUser dto)
    {
        dto.Id = Guid.NewGuid();
        dto.PasswordHash = Convert.ToHexString(System.Security.Cryptography.SHA256.HashData(
            System.Text.Encoding.UTF8.GetBytes(dto.PasswordHash))).ToLower();
        _db.PortalUsers.Add(dto);
        await _db.SaveChangesAsync();
        return Ok(dto);
    }
}

[ApiController]
[Route("api/v1/notifications")]
public class NotificationsController : ControllerBase
{
    private readonly PortalDbContext _db;
    public NotificationsController(PortalDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Send([FromBody] Notification dto)
    {
        dto.Id = Guid.NewGuid();
        _db.Notifications.Add(dto);
        await _db.SaveChangesAsync();
        return Ok(dto);
    }

    [HttpGet]
    public async Task<IActionResult> GetByUser([FromQuery] Guid userId)
    {
        var notifications = await _db.Notifications
            .Where(n => n.RecipientUserId == userId)
            .OrderByDescending(n => n.CreatedAtUtc).Take(50).ToListAsync();
        return Ok(notifications);
    }
}

[ApiController]
[Route("api/v1/subscriptions/{subscriptionId:guid}/amendments")]
public class AmendmentsController : ControllerBase
{
    private readonly PortalDbContext _db;
    public AmendmentsController(PortalDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Create(Guid subscriptionId, [FromBody] InvoiceAmendment dto)
    {
        dto.Id = Guid.NewGuid();
        dto.SubscriptionId = subscriptionId;
        _db.InvoiceAmendments.Add(dto);
        await _db.SaveChangesAsync();
        return Ok(dto);
    }
}