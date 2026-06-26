using Microsoft.EntityFrameworkCore;
using Pishgaman.SBA.Web.Data;

var builder = WebApplication.CreateBuilder(args);

// Configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Host=localhost;Database=sba_tenant;Username=postgres;Password=postgres";

// Database
builder.Services.AddDbContext<SbaDbContext>(options =>
    options.UseNpgsql(connectionString));

// MVC Controllers + API Controllers
builder.Services.AddControllersWithViews();

// OpenAPI/Swagger
builder.Services.AddOpenApi();

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

// Development middleware
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Static files (serves wwwroot including SPA dist)
app.UseStaticFiles();

app.UseCors();
app.UseAuthorization();

// API routes
app.MapControllers();

// SPA fallback: all non-API, non-static requests return Index.cshtml
app.MapWhen(ctx => !ctx.Request.Path.StartsWithSegments("/api"), spa =>
{
    spa.Use(async (context, next) =>
    {
        // Check if the file exists in wwwroot first
        var filePath = app.Environment.WebRootPath + context.Request.Path.Value;
        if (!System.IO.File.Exists(filePath) && !context.Request.Path.Value.StartsWith("/_"))
        {
            context.Request.Path = "/";
        }
        await next();
    });
    spa.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "spa-fallback",
            template: "{**slug}",
            defaults: new { controller = "Home", action = "Index" });
    });
});

// Bind to 0.0.0.0:3000
var port = args.Length > 0 ? args[0] : (Environment.GetEnvironmentVariable("PORT") ?? "3000");
app.Run($"http://0.0.0.0:{port}");