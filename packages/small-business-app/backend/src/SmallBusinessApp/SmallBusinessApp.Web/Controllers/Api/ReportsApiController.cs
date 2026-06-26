using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pishgaman.SBA.Domain.Reports;
using Pishgaman.SBA.Web.Data;

namespace Pishgaman.SBA.Web.Controllers.Api;

[ApiController]
[Route("api/v1/reports")]
public class ReportsApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public ReportsApiController(SbaDbContext db) => _db = db;

    [HttpGet("catalog")]
    public async Task<IActionResult> GetCatalog()
        => Ok(await _db.ReportDefinitions.OrderBy(r => r.Category).ThenBy(r => r.Title).ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var report = await _db.ReportDefinitions.FindAsync(id);
        return report is null ? NotFound() : Ok(report);
    }

    [HttpPost("{id}/run")]
    public async Task<IActionResult> RunReport(Guid id)
    {
        var report = await _db.ReportDefinitions.FindAsync(id);
        if (report is null) return NotFound();

        var execution = new ReportExecution
        {
            Id = Guid.NewGuid(),
            ReportDefinitionId = id,
            Status = "Completed"
        };
        _db.ReportExecutions.Add(execution);
        await _db.SaveChangesAsync();
        return Ok(execution);
    }

    [HttpGet("executions")]
    public async Task<IActionResult> GetExecutions()
        => Ok(await _db.ReportExecutions.OrderByDescending(e => e.CreatedAt).ToListAsync());
}

[ApiController]
[Route("api/v1/core/dashboard")]
public class DashboardApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public DashboardApiController(SbaDbContext db) => _db = db;

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var personnelCount = await _db.PersonnelProfiles.CountAsync();
        var pendingLeaves = await _db.LeaveRequests.CountAsync(l => l.Status == "PendingReview");
        return Ok(new
        {
            activeEmployees = personnelCount,
            pendingLeaveRequests = pendingLeaves,
            lastUpdated = DateTime.UtcNow
        });
    }
}