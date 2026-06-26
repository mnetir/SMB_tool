using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pishgaman.SBA.Domain.Core;
using Pishgaman.SBA.Web.Data;

namespace Pishgaman.SBA.Web.Controllers.Api;

[ApiController]
[Route("api/v1/org")]
public class OrgApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public OrgApiController(SbaDbContext db) => _db = db;

    [HttpGet("charts")]
    public async Task<IActionResult> GetCharts() => Ok(await _db.OrganizationCharts.ToListAsync());

    [HttpGet("nodes")]
    public async Task<IActionResult> GetNodes() => Ok(await _db.OrganizationNodes.ToListAsync());

    [HttpPost("nodes")]
    public async Task<IActionResult> CreateNode([FromBody] OrganizationNode node)
    {
        node.Id = Guid.NewGuid();
        _db.OrganizationNodes.Add(node);
        await _db.SaveChangesAsync();
        return Ok(node);
    }
}