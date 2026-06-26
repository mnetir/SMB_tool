using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pishgaman.SBA.Domain.Payroll;
using Pishgaman.SBA.Web.Data;

namespace Pishgaman.SBA.Web.Controllers.Api;

[ApiController]
[Route("api/v1/payroll/periods")]
public class PayrollPeriodsApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public PayrollPeriodsApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.PayrollPeriods.OrderByDescending(p => p.DateFrom).ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PayrollPeriod period)
    {
        period.Id = Guid.NewGuid();
        _db.PayrollPeriods.Add(period);
        await _db.SaveChangesAsync();
        return Ok(period);
    }
}

[ApiController]
[Route("api/v1/payroll/runs")]
public class PayrollRunsApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public PayrollRunsApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.PayrollRuns.ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PayrollRun run)
    {
        run.Id = Guid.NewGuid();
        _db.PayrollRuns.Add(run);
        await _db.SaveChangesAsync();
        return Ok(run);
    }
}

[ApiController]
[Route("api/v1/payroll/results")]
public class PayrollResultsApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public PayrollResultsApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.PayrollRunEmployees.ToListAsync());
}

[ApiController]
[Route("api/v1/payroll/payslips")]
public class PayslipsApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public PayslipsApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.PayrollRunEmployees.ToListAsync());

    [HttpPost("{id}/publish")]
    public async Task<IActionResult> Publish(Guid id)
    {
        var employee = await _db.PayrollRunEmployees.FindAsync(id);
        if (employee is null) return NotFound();
        employee.Status = "Published";
        employee.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(employee);
    }
}