using FluentValidation;
using MediatR;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy => policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Configure MediatR
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

// Configure FluentValidation
builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly);

var app = builder.Build();

app.UseCors("Frontend");
app.UseStaticFiles(); // Serve static files from wwwroot

// Scalar UI
app.MapOpenApi();
app.MapScalarApiReference(options =>
{
    options.Title = "STTB API";
    options.Theme = ScalarTheme.Purple;
});

app.MapControllers();
app.Run();