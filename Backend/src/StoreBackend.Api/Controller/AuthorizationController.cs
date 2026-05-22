using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using StoreBackend.Api.Mappers;
using StoreBackend.Api.Models.Requests;
using StoreBackend.Api.Services;
using StoreBackend.Facade;

namespace StoreBackend.Api.Controller;

[Route("api/authorization")]
[ApiController]
public class AuthorizationController(IUserFacade userFacade, JwtService jwtService) : ControllerBase
{
    private void SetTokenCookie(string token)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddMinutes(60)
        };
        Response.Cookies.Append("jwt", token, cookieOptions);
    }

    [EnableRateLimiting("AuthPolicy")]
    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginRequestModel loginRequestModel)
    {
        var loginDto = UserMapper.ToDto(loginRequestModel);
        var userDto = await userFacade.LoginAsync(loginDto);
        var userModel = UserMapper.ToModel(userDto);
        var token = jwtService.GenerateToken(userDto);
        SetTokenCookie(token);
        return Ok(userModel);
    }

    [EnableRateLimiting("AuthPolicy")]
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] CreateUserRequestModel createUserRequestModel)
    {
        var createUserDto = UserMapper.ToDto(createUserRequestModel);
        var userDto = await userFacade.CreateAsync(createUserDto);
        var userModel = UserMapper.ToModel(userDto);
        var token = jwtService.GenerateToken(userDto);
        SetTokenCookie(token);
        return Ok(userModel);
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("jwt", new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None
        });
        return Ok();
    }
}

