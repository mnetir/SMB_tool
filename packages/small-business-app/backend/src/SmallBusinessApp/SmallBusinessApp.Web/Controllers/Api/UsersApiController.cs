using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pishgaman.SBA.Domain.Core;
using Pishgaman.SBA.Web.Data;

namespace Pishgaman.SBA.Web.Controllers.Api;

[ApiController]
[Route("api/v1/users")]
public class UsersApiController : ControllerBase
{
    private readonly SbaDbContext _db;
    public UsersApiController(SbaDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.Users.OrderByDescending(u => u.CreatedAt).ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var user = await _db.Users.FindAsync(id);
        return user is null ? NotFound() : Ok(user);
    }

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
        if (user is null) return NotFound();
        if (update.DisplayName != null) user.DisplayName = update.DisplayName;
        if (update.Email != null) user.Email = update.Email;
        if (update.Phone != null) user.Phone = update.Phone;
        user.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(user);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user is null) return NotFound();
        user.IsActive = false;
        user.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return NoContent();
    }
}