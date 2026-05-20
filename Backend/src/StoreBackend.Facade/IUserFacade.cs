using StoreBackend.Dto;

namespace StoreBackend.Facade;

public interface IUserFacade
{
    Task<UserDto> LoginAsync(LoginUserDto loginDto);
    Task<UserDto> CreateAsync(CreateUserDto userDto);
    Task<UserDto> UpdateAsync(Guid userResourceId, UpdateUserDto userDto);
    Task DeleteAsync(Guid userResourceId, string password);
}