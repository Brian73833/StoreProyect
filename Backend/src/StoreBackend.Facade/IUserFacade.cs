using StoreBackend.Dto;

namespace StoreBackend.Facade;

public interface IUserFacade
{
    Task<UserDto> LoginAsync(LoginUserDto loginDto);
    Task<UserDto> CreateAsync(CreateUserDto userDto);
    Task<UserDto> UpdateAsync(Guid resourceId, UpdateUserDto userDto);
    Task DeleteAsync(Guid resourceId, string password);
}