using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StoreBackend.Domain.Entities;
using StoreBackend.DomainService;
using StoreBackend.Dto;
using StoreBackend.Facade.Mappers;
using StoreBackend.Exceptions;

namespace StoreBackend.Facade;

public class AuthorizationFacade : IAuthorizationFacade
{
    private readonly IUserService userService;
    private readonly IConfiguration configuration;

    public AuthorizationFacade(IUserService userService, IConfiguration configuration)
    {
        this.userService = userService;
        this.configuration = configuration;
    }

    public async Task<AuthorizationResponseDto> AuthorizeAsync(LoginUserDto requestDto)
    {        var user = await userService.LoginAsync(requestDto).ConfigureAwait(false);

        if (user == null)
        {
            throw new UnauthorizedResponseException();
        }

        var jwtSettings = configuration.GetSection("Jwt");
        var expirationMinutes = int.Parse(jwtSettings["ExpirationMinutes"] ?? "60");

        var token = GenerateJwtToken(user, jwtSettings, expirationMinutes);

        return new AuthorizationResponseDto
        {
            BearerToken = token,
            ExpiresIn = DateTime.UtcNow.AddMinutes(expirationMinutes),
            User = UserMapper.ToDto(user)
        };
    }

    private string GenerateJwtToken(User user, IConfigurationSection jwtSettings, int expirationMinutes)
    {
        var secret = jwtSettings["Secret"]!;
        var issuer = jwtSettings["Issuer"];
        var audience = jwtSettings["Audience"];

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.Email),
            new("externalId", user.UserResourceId.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(JwtRegisteredClaimNames.Sub, user.UserResourceId.ToString())
        };

        if (user.UserRoles != null)
        {
            claims.AddRange(user.UserRoles.Select(r => new Claim(ClaimTypes.Role, r.Role?.Name ?? "")));
        }

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
