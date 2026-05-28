using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using StoreBackend.Api.Models.Requests;
using StoreBackend.Api.Models.Responses;
using StoreBackend.Api.Mappers;
using StoreBackend.Facade;
using StoreBackend.Dto;

namespace StoreBackend.Api.Controller;

[Route("api/authorization")]
[ApiController]
public class AuthorizationController(IUserFacade userFacade, IAuthorizationFacade authorizationFacade) : ControllerBase
{
    [EnableRateLimiting("AuthPolicy")]
    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginRequestModel loginRequestModel)
    {
        var loginDto = UserMapper.ToDto(loginRequestModel);        var result = await authorizationFacade.AuthorizeAsync(loginDto).ConfigureAwait(false);

        return Ok(new AuthorizationResponse
        {
            BearerToken = result.BearerToken,
            ExpiresIn = result.ExpiresIn,
            User = UserMapper.ToModel(result.User)
        });
    }

    [EnableRateLimiting("AuthPolicy")]
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] CreateUserRequestModel createUserRequestModel)
    {
        var createUserDto = UserMapper.ToDto(createUserRequestModel);
        var userDto = await userFacade.CreateAsync(createUserDto);        var loginDto = new LoginUserDto
        {
            Email = userDto.Email,
            Password = createUserRequestModel.Password
        };
        var result = await authorizationFacade.AuthorizeAsync(loginDto).ConfigureAwait(false);

        return Ok(new AuthorizationResponse
        {
            BearerToken = result.BearerToken,
            ExpiresIn = result.ExpiresIn,
            User = UserMapper.ToModel(userDto)
        });
    }
}
