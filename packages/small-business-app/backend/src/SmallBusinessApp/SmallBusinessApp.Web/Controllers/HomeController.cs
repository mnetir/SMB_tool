using Microsoft.AspNetCore.Mvc;

namespace Pishgaman.SBA.Web.Controllers;

/// <summary>
/// Main MVC controller — serves the SPA shell for all SBA routes.
/// </summary>
public class HomeController : Controller
{
    [HttpGet("/")]
    [HttpGet("/core/{**slug}")]
    [HttpGet("/hr/{**slug}")]
    [HttpGet("/attendance/{**slug}")]
    [HttpGet("/payroll/{**slug}")]
    [HttpGet("/reports/{**slug}")]
    [HttpGet("/mobile/{**slug}")]
    public IActionResult Index() => View();
}