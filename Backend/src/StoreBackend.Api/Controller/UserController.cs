using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.Mvc;
using StoreBackend.Api.Mappers;
using StoreBackend.Api.Models.Requests;
using StoreBackend.Api.Services;
using StoreBackend.Dto;
using StoreBackend.Exceptions;
using StoreBackend.Facade;

namespace StoreBackend.Api.Controller
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserFacade _userFacade;
        private readonly JwtService _jwtService;

        public UserController(IUserFacade userFacade, JwtService jwtService)
        {
            _userFacade = userFacade;
            _jwtService = jwtService;
        }

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

        [EnableRateLimiting("AuthPolicy")]
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequestModel loginRequestModel)
        {
            try
            {
                var loginDto = UserMapper.ToDto(loginRequestModel);
                var userDto = await _userFacade.LoginAsync(loginDto);
                var userModel = UserMapper.ToModel(userDto);
                var token = _jwtService.GenerateToken(userDto);
                SetTokenCookie(token);
                return Ok(userModel);
            }
            catch (BadRequestResponseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [EnableRateLimiting("AuthPolicy")]
        [HttpPost("register")]
        public async Task<IActionResult> CreateUserAsync([FromBody] CreateUserRequestModel createUserRequestModel)
        {
            try
            {
                var createDto = UserMapper.ToDto(createUserRequestModel);
                var userDto = await _userFacade.CreateAsync(createDto);
                var userModel = UserMapper.ToModel(userDto);
                var token = _jwtService.GenerateToken(userDto);
                SetTokenCookie(token);
                return Ok(userModel);
            }
            catch (BadRequestResponseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [Authorize]
        [HttpPut("{resourceId}")]
        public async Task<IActionResult> UpdateUserAsync(Guid resourceId, [FromBody] UpdateUserRequestModel updateUserRequestModel)
        {
            try
            {
                var updateDto = UserMapper.ToDto(updateUserRequestModel);
                var userDto = await _userFacade.UpdateAsync(resourceId, updateDto);
                var userModel = UserMapper.ToModel(userDto);
                return Ok(userModel);
            }
            catch (BadRequestResponseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }

        [Authorize]
        [HttpDelete("{resourceId}")]
        public async Task<IActionResult> DeleteUserAsync(Guid resourceId, [FromBody] DeleteUserRequestModel deleteUserRequestModel)
        {
            try
            {
                await _userFacade.DeleteAsync(resourceId, deleteUserRequestModel.Password);
                return Ok();
            }
            catch (BadRequestResponseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }
        }
    }
}