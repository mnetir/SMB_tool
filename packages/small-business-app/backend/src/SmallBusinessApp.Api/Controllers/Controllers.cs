using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pishgaman.SBA.Api.Data;
using Pishgaman.SBA.Domain.Core;
using Pishgaman.SBA.Domain.HR;
using Pishgaman.SBA.Domain.TimeAttendance;
using Pishgaman.SBA.Domain.Payroll;
using Pishgaman.SBA.Domain.Mobile;

namespace Pishgaman.SBA.Api.Controllers;

[ApiController]
[Route("api/v1/health")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Check() => Ok(new { status = "ok", timestamp = DateTime.UtcNow, service = "pishgaman-sba" });
}

[ApiController]
[Route("api/v1/users")]
public class UsersController : ControllerBase
{
    private readonly SbaDbContext _db;
    public UsersController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.Users.OrderByDescending(u => u.CreatedAt).ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] User user)
    {
        user.Id = Guid.NewGuid();
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        return Ok(user);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] User update)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null) return NotFound();
        if (update.DisplayName != null) user.DisplayName = update.DisplayName;
        if (update.Email != null) user.Email = update.Email;
        user.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(user);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null) return NotFound();
        user.IsActive = false;
        user.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

[ApiController]
[Route("api/v1/org")]
public class OrgController : ControllerBase
{
    private readonly SbaDbContext _db;
    public OrgController(SbaDbContext db) => _db = db;

    [HttpGet("charts")]
    public async Task<IActionResult> GetCharts() => Ok(await _db.OrganizationCharts.ToListAsync());

    [HttpPost("nodes")]
    public async Task<IActionResult> CreateNode([FromBody] OrganizationNode node)
    {
        node.Id = Guid.NewGuid();
        _db.OrganizationNodes.Add(node);
        await _db.SaveChangesAsync();
        return Ok(node);
    }
}

[ApiController]
[Route("api/v1/projects")]
public class ProjectsController : ControllerBase
{
    private readonly SbaDbContext _db;
    public ProjectsController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.Projects.OrderByDescending(p => p.CreatedAt).ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Project project)
    {
        project.Id = Guid.NewGuid();
        _db.Projects.Add(project);
        await _db.SaveChangesAsync();
        return Ok(project);
    }
}

[ApiController]
[Route("api/v1/positions")]
public class PositionsController : ControllerBase
{
    private readonly SbaDbContext _db;
    public PositionsController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.Positions.ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Position position)
    {
        position.Id = Guid.NewGuid();
        _db.Positions.Add(position);
        await _db.SaveChangesAsync();
        return Ok(position);
    }
}

[ApiController]
[Route("api/v1/hr/personnel")]
public class PersonnelController : ControllerBase
{
    private readonly SbaDbContext _db;
    public PersonnelController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.PersonnelProfiles.OrderByDescending(p => p.CreatedAt).ToListAsync());

    [HttpGet("{id}/profile")]
    public async Task<IActionResult> GetProfile(Guid id)
    {
        var profile = await _db.PersonnelProfiles.FindAsync(id);
        if (profile == null) return NotFound();
        return Ok(profile);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PersonnelProfile profile)
    {
        profile.Id = Guid.NewGuid();
        _db.PersonnelProfiles.Add(profile);
        await _db.SaveChangesAsync();
        return Ok(profile);
    }
}

[ApiController]
[Route("api/v1/hr/contracts")]
public class ContractsController : ControllerBase
{
    private readonly SbaDbContext _db;
    public ContractsController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.EmploymentContracts.OrderByDescending(c => c.CreatedAt).ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] EmploymentContract contract)
    {
        contract.Id = Guid.NewGuid();
        _db.EmploymentContracts.Add(contract);
        await _db.SaveChangesAsync();
        return Ok(contract);
    }

    [HttpPost("{id}/amend")]
    public async Task<IActionResult> Amend(Guid id, [FromBody] ContractAmendment amendment)
    {
        var contract = await _db.EmploymentContracts.FindAsync(id);
        if (contract == null) return NotFound();
        amendment.EmploymentContractId = id;
        amendment.Id = Guid.NewGuid();
        _db.ContractAmendments.Add(amendment);
        await _db.SaveChangesAsync();
        return Ok(amendment);
    }
}

[ApiController]
[Route("api/v1/hr/insurance")]
public class InsuranceController : ControllerBase
{
    private readonly SbaDbContext _db;
    public InsuranceController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.InsuranceProfiles.ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] InsuranceProfile profile)
    {
        profile.Id = Guid.NewGuid();
        _db.InsuranceProfiles.Add(profile);
        await _db.SaveChangesAsync();
        return Ok(profile);
    }
}

[ApiController]
[Route("api/v1/hr/dependents")]
public class DependentsController : ControllerBase
{
    private readonly SbaDbContext _db;
    public DependentsController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.Dependents.ToListAsync());
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Dependent d) { d.Id = Guid.NewGuid(); _db.Dependents.Add(d); await _db.SaveChangesAsync(); return Ok(d); }
}

[ApiController]
[Route("api/v1/hr/education")]
public class EducationController : ControllerBase
{
    private readonly SbaDbContext _db;
    public EducationController(SbaDbContext db) => _db = db;
    [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _db.EducationRecords.ToListAsync());
    [HttpPost] public async Task<IActionResult> Create([FromBody] EducationRecord r) { r.Id = Guid.NewGuid(); _db.EducationRecords.Add(r); await _db.SaveChangesAsync(); return Ok(r); }
}

[ApiController]
[Route("api/v1/hr/skills")]
public class SkillsController : ControllerBase
{
    private readonly SbaDbContext _db;
    public SkillsController(SbaDbContext db) => _db = db;
    [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _db.SkillRecords.ToListAsync());
    [HttpPost] public async Task<IActionResult> Create([FromBody] SkillRecord r) { r.Id = Guid.NewGuid(); _db.SkillRecords.Add(r); await _db.SaveChangesAsync(); return Ok(r); }
}

[ApiController]
[Route("api/v1/hr/certifications")]
public class CertificationsController : ControllerBase
{
    private readonly SbaDbContext _db;
    public CertificationsController(SbaDbContext db) => _db = db;
    [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _db.CertificationRecords.ToListAsync());
    [HttpPost] public async Task<IActionResult> Create([FromBody] CertificationRecord r) { r.Id = Guid.NewGuid(); _db.CertificationRecords.Add(r); await _db.SaveChangesAsync(); return Ok(r); }
}

[ApiController]
[Route("api/v1/hr/documents")]
public class DocumentsController : ControllerBase
{
    private readonly SbaDbContext _db;
    public DocumentsController(SbaDbContext db) => _db = db;
    [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _db.PersonnelDocuments.ToListAsync());
    [HttpPost] public async Task<IActionResult> Create([FromBody] PersonnelDocument d) { d.Id = Guid.NewGuid(); _db.PersonnelDocuments.Add(d); await _db.SaveChangesAsync(); return Ok(d); }
}

[ApiController]
[Route("api/v1/attendance")]
public class AttendanceController : ControllerBase
{
    private readonly SbaDbContext _db;
    public AttendanceController(SbaDbContext db) => _db = db;

    [HttpPost("ingest")]
    public async Task<IActionResult> Ingest([FromBody] RawTraffic traffic)
    {
        traffic.Id = Guid.NewGuid();
        traffic.ReceivedAtUtc = DateTime.UtcNow;
        _db.RawTraffic.Add(traffic);
        await _db.SaveChangesAsync();
        return Ok(traffic);
    }

    [HttpGet("transactions")]
    public async Task<IActionResult> GetTransactions() => Ok(await _db.AttendanceTransactions.OrderByDescending(t => t.TransactionDateTime).ToListAsync());

    [HttpGet("shifts")]
    public async Task<IActionResult> GetShifts() => Ok(await _db.Shifts.ToListAsync());

    [HttpPost("shifts")]
    public async Task<IActionResult> CreateShift([FromBody] Shift shift)
    {
        shift.Id = Guid.NewGuid();
        _db.Shifts.Add(shift);
        await _db.SaveChangesAsync();
        return Ok(shift);
    }

    [HttpPost("leave-requests")]
    public async Task<IActionResult> SubmitLeave([FromBody] LeaveRequest request)
    {
        request.Id = Guid.NewGuid();
        _db.LeaveRequests.Add(request);
        await _db.SaveChangesAsync();
        return Ok(request);
    }

    [HttpPost("mission-requests")]
    public async Task<IActionResult> SubmitMission([FromBody] MissionRequest request)
    {
        request.Id = Guid.NewGuid();
        _db.MissionRequests.Add(request);
        await _db.SaveChangesAsync();
        return Ok(request);
    }

    [HttpPost("overtime-requests")]
    public async Task<IActionResult> SubmitOvertime([FromBody] OvertimeRequest request)
    {
        request.Id = Guid.NewGuid();
        _db.OvertimeRequests.Add(request);
        await _db.SaveChangesAsync();
        return Ok(request);
    }

    [HttpGet("daily-summaries")]
    public async Task<IActionResult> GetDailySummaries([FromQuery] Guid? userId)
    {
        var q = _db.AttendanceDailySummaries.AsQueryable();
        if (userId.HasValue) q = q.Where(s => s.UserId == userId.Value);
        return Ok(await q.OrderByDescending(s => s.AttendanceDate).ToListAsync());
    }

    [HttpGet("monthly-summaries")]
    public async Task<IActionResult> GetMonthlySummaries([FromQuery] Guid? userId)
    {
        var q = _db.AttendanceMonthlySummaries.AsQueryable();
        if (userId.HasValue) q = q.Where(s => s.UserId == userId.Value);
        return Ok(await q.OrderByDescending(s => s.Year).ThenByDescending(s => s.Month).ToListAsync());
    }
}

[ApiController]
[Route("api/v1/payroll")]
public class PayrollController : ControllerBase
{
    private readonly SbaDbContext _db;
    public PayrollController(SbaDbContext db) => _db = db;

    [HttpGet("periods")]
    public async Task<IActionResult> GetPeriods() => Ok(await _db.PayrollPeriods.OrderByDescending(p => p.Year).ThenByDescending(p => p.Month).ToListAsync());

    [HttpPost("periods")]
    public async Task<IActionResult> CreatePeriod([FromBody] PayrollPeriod period)
    {
        period.Id = Guid.NewGuid();
        _db.PayrollPeriods.Add(period);
        await _db.SaveChangesAsync();
        return Ok(period);
    }

    [HttpGet("runs")]
    public async Task<IActionResult> GetRuns() => Ok(await _db.PayrollRuns.OrderByDescending(r => r.CreatedAt).ToListAsync());

    [HttpPost("runs")]
    public async Task<IActionResult> CreateRun([FromBody] PayrollRun run)
    {
        run.Id = Guid.NewGuid();
        _db.PayrollRuns.Add(run);
        await _db.SaveChangesAsync();
        return Ok(run);
    }

    [HttpGet("runs/{id}")]
    public async Task<IActionResult> GetRun(Guid id)
    {
        var run = await _db.PayrollRuns.FindAsync(id);
        if (run == null) return NotFound();
        return Ok(run);
    }

    [HttpGet("runs/{id}/employees")]
    public async Task<IActionResult> GetRunEmployees(Guid id)
    {
        return Ok(await _db.PayrollRunEmployees.Where(e => e.PayrollRunId == id).ToListAsync());
    }
}

[ApiController]
[Route("api/v1/mobile")]
public class MobileController : ControllerBase
{
    private readonly SbaDbContext _db;
    public MobileController(SbaDbContext db) => _db = db;

    [HttpPost("devices")]
    public async Task<IActionResult> RegisterDevice([FromBody] MobileDevice device)
    {
        device.Id = Guid.NewGuid();
        _db.MobileDevices.Add(device);
        await _db.SaveChangesAsync();
        return Ok(device);
    }

    [HttpPost("auth/login")]
    public IActionResult Login([FromBody] dynamic body) => Ok(new
    {
        accessToken = "mock-token-" + DateTime.UtcNow.Ticks,
        refreshToken = "mock-refresh-" + DateTime.UtcNow.Ticks,
        user = new { id = Guid.NewGuid(), username = "user", displayName = "کاربر موبایل" }
    });

    [HttpDelete("sessions/logout")]
    public IActionResult Logout() => Ok(new { message = "logged out" });

    [HttpGet("profile")]
    public IActionResult GetProfile() => Ok(new { displayName = "کاربر", isEmployee = true });
}