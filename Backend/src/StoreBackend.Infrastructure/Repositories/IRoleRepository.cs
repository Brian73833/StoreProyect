using StoreBackend.Domain.Entities;

namespace StoreBackend.Infrastructure.Repositories;

public interface IRoleRepository
{
    Task<Role?> GetByNameAsync(string roleName);
}
