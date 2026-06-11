using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain.Portal.Entities;
using CustomerPortal.Api.Data;

namespace CustomerPortal.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly PortalDbContext _db;
    public ProductsController(PortalDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _db.Products.Include(p => p.Modules).OrderBy(p => p.Name).ToListAsync();
        return Ok(products);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await _db.Products
            .Include(p => p.Modules).ThenInclude(m => m.Permissions)
            .Include(p => p.Modules).ThenInclude(m => m.Limits)
            .FirstOrDefaultAsync(p => p.Id == id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Product dto)
    {
        dto.Id = Guid.NewGuid();
        _db.Products.Add(dto);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }

    [HttpPatch("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Product dto)
    {
        var product = await _db.Products.FindAsync(id);
        if (product == null) return NotFound();
        if (dto.Name != null) product.Name = dto.Name;
        if (dto.Description != null) product.Description = dto.Description;
        product.ModifiedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(product);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product == null) return NotFound();
        _db.Products.Remove(product);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

[ApiController]
[Route("api/v1/products/{productId:guid}/modules")]
public class ModulesController : ControllerBase
{
    private readonly PortalDbContext _db;
    public ModulesController(PortalDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll(Guid productId)
    {
        var modules = await _db.Modules.Where(m => m.ProductId == productId).OrderBy(m => m.Name).ToListAsync();
        return Ok(modules);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Guid productId, [FromBody] Module dto)
    {
        dto.Id = Guid.NewGuid();
        dto.ProductId = productId;
        _db.Modules.Add(dto);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(ModulesController.GetAll), new { productId }, dto);
    }

    [HttpPatch("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Module dto)
    {
        var module = await _db.Modules.FindAsync(id);
        if (module == null) return NotFound();
        if (dto.Name != null) module.Name = dto.Name;
        if (dto.Code != null) module.Code = dto.Code;
        module.ModifiedAtUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(module);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var module = await _db.Modules.FindAsync(id);
        if (module == null) return NotFound();
        _db.Modules.Remove(module);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

[ApiController]
[Route("api/v1/modules/{moduleId:guid}/permissions")]
public class PermissionsController : ControllerBase
{
    private readonly PortalDbContext _db;
    public PermissionsController(PortalDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll(Guid moduleId)
    {
        var perms = await _db.Permissions.Where(p => p.ModuleId == moduleId).ToListAsync();
        return Ok(perms);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Guid moduleId, [FromBody] Permission dto)
    {
        dto.Id = Guid.NewGuid();
        dto.ModuleId = moduleId;
        _db.Permissions.Add(dto);
        await _db.SaveChangesAsync();
        return Ok(dto);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var perm = await _db.Permissions.FindAsync(id);
        if (perm == null) return NotFound();
        _db.Permissions.Remove(perm);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

[ApiController]
[Route("api/v1/modules/{moduleId:guid}/limits")]
public class PermissionLimitsController : ControllerBase
{
    private readonly PortalDbContext _db;
    public PermissionLimitsController(PortalDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll(Guid moduleId)
    {
        var limits = await _db.PermissionLimits.Where(l => l.ModuleId == moduleId).ToListAsync();
        return Ok(limits);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Guid moduleId, [FromBody] PermissionLimit dto)
    {
        dto.Id = Guid.NewGuid();
        dto.ModuleId = moduleId;
        _db.PermissionLimits.Add(dto);
        await _db.SaveChangesAsync();
        return Ok(dto);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var limit = await _db.PermissionLimits.FindAsync(id);
        if (limit == null) return NotFound();
        _db.PermissionLimits.Remove(limit);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

[ApiController]
[Route("api/v1/sales-plans")]
public class SalesPlansController : ControllerBase
{
    private readonly PortalDbContext _db;
    public SalesPlansController(PortalDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var plans = await _db.SalesPlans.Include(p => p.Product).OrderBy(p => p.Name).ToListAsync();
        return Ok(plans);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var plan = await _db.SalesPlans
            .Include(p => p.Product)
            .Include(p => p.PlanPermissions).ThenInclude(pp => pp.Permission)
            .Include(p => p.PlanLimits).ThenInclude(pl => pl.LimitDef)
            .FirstOrDefaultAsync(p => p.Id == id);
        if (plan == null) return NotFound();
        return Ok(plan);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SalesPlan dto)
    {
        dto.Id = Guid.NewGuid();
        _db.SalesPlans.Add(dto);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }

    [HttpPut("{id:guid}/limits")]
    public async Task<IActionResult> SetLimits(Guid id, [FromBody] List<PlanLimit> limits)
    {
        var existing = _db.PlanLimits.Where(pl => pl.PlanId == id);
        _db.PlanLimits.RemoveRange(existing);
        foreach (var l in limits) { l.PlanId = id; _db.PlanLimits.Add(l); }
        await _db.SaveChangesAsync();
        return Ok(limits);
    }

    [HttpPut("{id:guid}/permissions")]
    public async Task<IActionResult> SetPermissions(Guid id, [FromBody] List<Guid> permissionIds)
    {
        var existing = _db.PlanPermissions.Where(pp => pp.PlanId == id);
        _db.PlanPermissions.RemoveRange(existing);
        foreach (var pid in permissionIds)
            _db.PlanPermissions.Add(new PlanPermission { PlanId = id, PermissionId = pid });
        await _db.SaveChangesAsync();
        return Ok();
    }
}