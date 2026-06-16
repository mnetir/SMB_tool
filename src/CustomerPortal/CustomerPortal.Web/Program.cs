var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

app.UseRouting();
app.UseAuthorization();

// Serve static files (wwwroot: SPA bundle, PWA assets)
app.UseStaticFiles();

// SPA fallback: all non-file, non-api routes serve the SPA shell
app.MapControllerRoute(
    name: "spa-fallback",
    pattern: "{**path}",
    defaults: new { controller = "Home", action = "Index" });

app.Run();