using StoreBackend.Domain.Entities;
using StoreBackend.Dto;

namespace StoreBackend.DomainService;

public interface IUserService
{
    Task<User> LoginAsync(LoginUserDto loginDto);
    Task<User> CreateAsync(CreateUserDto userDto);
    Task<User> UpdateAsync(Guid userResourceId, UpdateUserDto userDto);
    Task DeleteAsync(Guid userResourceId, string password);
}