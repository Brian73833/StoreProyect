using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StoreBackend.Api.Services;
using StoreBackend.DomainService;
using StoreBackend.Facade;
using StoreBackend.Infrastructure;
using StoreBackend.Infrastructure.Repositories;
using StoreBackend.Api.Filters;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    WebRootPath = "Images"
});
builder.Services.AddControllers(options =>
{
    options.Filters.Add<MessageExceptionFilter>();
    options.SuppressAsyncSuffixInActionNames = false;
});

builder.Services.AddCors(options =>
{
    var allowedOrigins = builder.Configuration
        .GetSection("Cors:AllowedOrigins")
        .Get<string[]>() ?? [];

    options.AddPolicy("SecurePolicy", policy =>
    {
        if (allowedOrigins.Length == 0)
        {
            policy.SetIsOriginAllowed(_ => false);
        }
        else
        {
            policy
                .WithOrigins(allowedOrigins)
                .WithMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .WithHeaders("Content-Type", "Authorization")
                .AllowCredentials();
        }
    });
});

var permitLimit = builder.Configuration
 .GetValue<int>("RateLimiting:PermitLimit");

var windowSeconds = builder.Configuration
 .GetValue<int>("RateLimiting:WindowSeconds");

var queueLimit = builder.Configuration
 .GetValue<int>("RateLimiting:QueueLimit");


builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("fixed", limiterOptions =>
    {
        limiterOptions.PermitLimit = permitLimit;
        limiterOptions.Window = TimeSpan.FromSeconds(windowSeconds);
        limiterOptions.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiterOptions.QueueLimit = queueLimit;
    });
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.OnRejected = async (context, token) =>
    {
        context.HttpContext.Response.ContentType = "application/json";

        await context.HttpContext.Response.WriteAsync(
            """
            {
                "status": 429,
                "message": "Demasiadas solicitudes, intenta mas tarde"
            }
            """,
            cancellationToken: token);
    };
});

var jwtSettings = builder.Configuration.GetSection("Jwt");

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings["Secret"]!))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IProductFacade, ProductFacade>();
builder.Services.AddScoped<IUserFacade, UserFacade>();
builder.Services.AddScoped<ICategoryFacade, CategoryFacade>();
builder.Services.AddScoped<IAuthorizationFacade, AuthorizationFacade>();
builder.Services.AddScoped<IImageService, ImageService>();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("SecurePolicy");

app.UseAuthentication();
app.UseAuthorization();

app.UseRateLimiter();

app.MapControllers()
    .RequireRateLimiting("fixed");

app.Run();
