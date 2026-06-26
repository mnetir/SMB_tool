using Microsoft.AspNetCore.Mvc;

namespace Pishgaman.SBA.Web.Controllers;

/// <summary>
/// Health check endpoint.
/// </summary>
[ApiController]
[Route("api/v1/health")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Check() => Ok(new
    {
        status = "ok",
        timestamp = DateTime.UtcNow,
        service = "pishgaman-sba",
        version = "3.0.0"
    });
}