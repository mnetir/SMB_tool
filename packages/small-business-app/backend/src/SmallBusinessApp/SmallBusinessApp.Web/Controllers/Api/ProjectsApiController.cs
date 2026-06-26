using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pishgaman.SBA.Domain.Core;
using Pishgaman.SBA.Web.Data;

namespace Pishgaman.SBA.Web.Controllers.Api;

[ApiController]
[Route("api/v1/projects")]
public class ProjectsApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public ProjectsApiController(SbaDbContext db) => _db = db;

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
public class PositionsApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public PositionsApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.Positions.OrderBy(p => p.PositionTitle).ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Position position)
    {
        position.Id = Guid.NewGuid();
        _db.Positions.Add(position);
        await _db.SaveChangesAsync();
        return Ok(position);
    }
}