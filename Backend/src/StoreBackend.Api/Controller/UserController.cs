using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreBackend.Api.Mappers;
using StoreBackend.Api.Models.Requests;
using StoreBackend.Facade;

namespace StoreBackend.Api.Controller
{
    [Authorize]
    [Route("api/users")]
    [ApiController]
    public class UserController(IUserFacade userFacade) : ControllerBase
    {
        private bool IsCurrentUser(Guid userResourceId)
        {
            var currentUserId = User.FindFirst("externalId")?.Value;
            return currentUserId == userResourceId.ToString();
        }

        [HttpPut("{userResourceId}")]
        public async Task<IActionResult> UpdateUserAsync(Guid userResourceId, [FromBody] UpdateUserRequestModel updateUserRequestModel)
        {
            if (!IsCurrentUser(userResourceId))
            {
                return Forbid();
            }

            var updateUserDto = UserMapper.ToDto(updateUserRequestModel);
            var userDto = await userFacade.UpdateAsync(userResourceId, updateUserDto);
            var userModel = UserMapper.ToModel(userDto);
            return Ok(userModel);
        }

        [HttpDelete("{userResourceId}")]
        public async Task<IActionResult> DeleteUserAsync(Guid userResourceId, [FromBody] DeleteUserRequestModel deleteUserRequestModel)
        {
            if (!IsCurrentUser(userResourceId))
            {
                return Forbid();
            }

            await userFacade.DeleteAsync(userResourceId, deleteUserRequestModel.Password);

            return Ok();
        }
    }
}

