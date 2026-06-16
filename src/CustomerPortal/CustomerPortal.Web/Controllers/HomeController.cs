using Microsoft.AspNetCore.Mvc;

namespace CustomerPortal.Web.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    [Route("/portal/{**path}")]
    public IActionResult Portal(string path)
    {
        return View("Index");
    }
}