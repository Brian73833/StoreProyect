using Microsoft.AspNetCore.Mvc;
using StoreBackend.Api.Mappers;
using StoreBackend.Api.Models.Requests;
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

        public UserController(IUserFacade userFacade)
        {
            _userFacade = userFacade;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequestModel loginRequestModel)
        {
            try
            {
                var loginDto = UserMapper.ToDto(loginRequestModel);
                var userDto = await _userFacade.LoginAsync(loginDto);
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

        [HttpPost("register")]
        public async Task<IActionResult> CreateUserAsync([FromBody] CreateUserRequestModel createUserRequestModel)
        {
            try
            {
                var createDto = UserMapper.ToDto(createUserRequestModel);
                var userDto = await _userFacade.CreateAsync(createDto);
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