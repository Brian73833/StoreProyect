using StoreBackend.Dto;

namespace StoreBackend.DomainService;

public interface ICategoryService
{
    Task<List<CategoryDto>> GetAllAsync();
    Task<CategoryDto> AddAsync(CategoryDto category);
}
