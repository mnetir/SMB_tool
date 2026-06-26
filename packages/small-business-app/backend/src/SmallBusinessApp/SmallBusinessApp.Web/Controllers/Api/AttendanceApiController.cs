using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pishgaman.SBA.Domain.TimeAttendance;
using Pishgaman.SBA.Web.Data;

namespace Pishgaman.SBA.Web.Controllers.Api;

[ApiController]
[Route("api/v1/attendance/shifts")]
public class ShiftsApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public ShiftsApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.Shifts.ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Shift shift)
    {
        shift.Id = Guid.NewGuid();
        _db.Shifts.Add(shift);
        await _db.SaveChangesAsync();
        return Ok(shift);
    }
}

[ApiController]
[Route("api/v1/attendance/raw-traffic")]
public class RawTrafficApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public RawTrafficApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] DateTime? from, [FromQuery] DateTime? to)
    {
        var query = _db.RawTraffic.AsQueryable();
        if (from.HasValue) query = query.Where(r => r.RawDateTime >= from.Value);
        if (to.HasValue) query = query.Where(r => r.RawDateTime <= to.Value);
        return Ok(await query.OrderByDescending(r => r.RawDateTime).ToListAsync());
    }
}

[ApiController]
[Route("api/v1/attendance/leaves")]
public class LeavesApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public LeavesApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.LeaveRequests.OrderByDescending(l => l.CreatedAt).ToListAsync());

    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(Guid id)
    {
        var leave = await _db.LeaveRequests.FindAsync(id);
        if (leave is null) return NotFound();
        leave.Status = "Approved";
        leave.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(leave);
    }

    [HttpPost("{id}/reject")]
    public async Task<IActionResult> Reject(Guid id)
    {
        var leave = await _db.LeaveRequests.FindAsync(id);
        if (leave is null) return NotFound();
        leave.Status = "Rejected";
        leave.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(leave);
    }
}

[ApiController]
[Route("api/v1/attendance/missions")]
public class MissionsApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public MissionsApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.MissionRequests.OrderByDescending(m => m.CreatedAt).ToListAsync());
}

[ApiController]
[Route("api/v1/attendance/overtime")]
public class OvertimeApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public OvertimeApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.OvertimeRequests.OrderByDescending(o => o.CreatedAt).ToListAsync());
}

[ApiController]
[Route("api/v1/attendance/daily-summary")]
public class DailySummaryApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public DailySummaryApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetByDate([FromQuery] DateTime date)
        => Ok(await _db.AttendanceDailySummaries.Where(s => s.AttendanceDate == DateOnly.FromDateTime(date)).ToListAsync());
}

[ApiController]
[Route("api/v1/attendance/monthly-summary")]
public class MonthlySummaryApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public MonthlySummaryApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetByMonth([FromQuery] int year, [FromQuery] int month)
        => Ok(await _db.AttendanceMonthlySummaries.Where(s => s.Year == year && s.Month == month).ToListAsync());
}

[ApiController]
[Route("api/v1/attendance/transactions")]
public class AttendanceTransactionsApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public AttendanceTransactionsApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.AttendanceTransactions.OrderByDescending(t => t.TransactionDateTime).ToListAsync());
}