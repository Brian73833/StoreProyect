using StoreBackend.Domain.Entities;
using StoreBackend.Dto;

namespace StoreBackend.DomainService;

public interface ICategoryService
{
    Task<List<Category>> GetAllAsync();
    Task<Category> AddAsync(CategoryDto category);
}
