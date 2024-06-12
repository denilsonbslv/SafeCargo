using SafeCargo.Server.Extensions;
using Microsoft.EntityFrameworkCore;
using SafeCargo.Server.Data;
using SafeCargo.Server.Interfaces;
using SafeCargo.Server.Repositories;
using SafeCargo.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure the database context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 21)) // Especifique a versão do MySQL aqui
    ));

// Add custom services and repositories
builder.Services.AddCustomServices();

// Load Access Levels and configure custom authorization
await AccessLevelLoader.LoadAccessLevels(builder.Services.BuildServiceProvider());
builder.Services.AddCustomAuthorization();

// Configure JWT Authentication
builder.Services.AddJwtAuthentication(builder.Configuration);

// Add Swagger documentation
builder.Services.AddSwaggerDocumentation();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SafeCargo API v1");
        c.RoutePrefix = string.Empty; // Abre o Swagger na raiz
    });
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseRequestLogging(); // Adicionar o middleware personalizado aqui
app.MapControllers();

app.Run();
