using StoreBackend.Domain.Entities;

namespace StoreBackend.Infrastructure.Repositories;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<bool> HasUserByEmailAsync(string email);
    Task<User?> GetByIdAsync(Guid userResourceId);
    Task<User> CreateAsync(User user);
    Task<User> UpdateAsync(User user);
    Task DeleteAsync(User user);
}