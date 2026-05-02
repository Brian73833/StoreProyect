using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StoreBackend.Api.Services;
using StoreBackend.DomainService;
using StoreBackend.Facade;
using StoreBackend.Infrastructure;
using StoreBackend.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    WebRootPath = "Images"
});

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    var allowedOrigins = builder.Configuration
        .GetSection("Cors:AllowedOrigins")
        .Get<string[]>() ?? [];

    options.AddPolicy("SecurePolicy", policy =>
    {
        if (allowedOrigins.Length == 0)
        {
            // No origins configured: block all cross-origin requests
            policy.SetIsOriginAllowed(_ => false);
        }
        else
        {
            policy
                .WithOrigins(allowedOrigins)
                .WithMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .WithHeaders("Content-Type", "Authorization")
                .DisallowCredentials();
        }
    });
});

// ─── JWT Authentication ────────────────────────────────────────────────────────
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("JWT Key is not configured.");

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// Repositories
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

// Services
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

// Facades
builder.Services.AddScoped<IProductFacade, ProductFacade>();
builder.Services.AddScoped<IUserFacade, UserFacade>();
builder.Services.AddScoped<ICategoryFacade, CategoryFacade>();

// JWT Service
builder.Services.AddSingleton<JwtService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("SecurePolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
