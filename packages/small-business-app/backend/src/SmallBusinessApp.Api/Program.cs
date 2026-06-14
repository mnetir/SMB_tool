using Microsoft.EntityFrameworkCore;
using Pishgaman.SBA.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Host=localhost;Database=sba_tenant;Username=postgres;Password=postgres";

builder.Services.AddDbContext<SbaDbContext>(options =>
    options.UseNpgsql(connectionString));

// Controllers + OpenAPI
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();
app.UseAuthorization();
app.MapControllers();

// Bind to 0.0.0.0:3000
var port = args.Length > 0 ? args[0] : (Environment.GetEnvironmentVariable("PORT") ?? "3000");
app.Run($"http://0.0.0.0:{port}");
