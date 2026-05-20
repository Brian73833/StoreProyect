using StoreBackend.Domain.Entities;

namespace StoreBackend.Infrastructure.Repositories;

public interface ICategoryRepository
{
    Task<List<Category>> GetAllAsync();
    Task<Category?> GetByIdAsync(int id);
    Task<Category?> GetByIdAsync(Guid categoryResourceId);
    Task<Category> AddAsync(Category category);
}
