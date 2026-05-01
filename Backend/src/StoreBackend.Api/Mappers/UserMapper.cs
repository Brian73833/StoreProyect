using StoreBackend.Api.Models.Requests;
using StoreBackend.Api.Models.Responses;
using StoreBackend.Dto;

namespace StoreBackend.Api.Mappers;

public class UserMapper
{
    public static UserResponseModel ToModel(UserDto user)
    {
        return new UserResponseModel
        {
            UserResourceId = user.UserResourceId,
            Name = user.Name,
            Email = user.Email,
            IsAdmin = user.IsAdmin
        };
    }

    public static LoginUserDto ToDto(LoginRequestModel model)
    {
        return new LoginUserDto
        {
            Email = model.Email,
            Password = model.Password
        };
    }

    public static CreateUserDto ToDto(CreateUserRequestModel model)
    {
        return new CreateUserDto
        {
            Name = model.Name,
            Email = model.Email,
            Password = model.Password
        };
    }

    public static UpdateUserDto ToDto(UpdateUserRequestModel model)
    {
        return new UpdateUserDto
        {
            Name = model.Name,
            Email = model.Email,
            CurrentPassword = model.CurrentPassword,
            NewPassword = model.NewPassword
        };
    }
}