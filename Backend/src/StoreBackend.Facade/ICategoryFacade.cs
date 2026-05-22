using StoreBackend.Dto;

namespace StoreBackend.Facade;

public interface ICategoryFacade
{
    Task<List<CategoryDto>> GetAllAsync();
    Task<CategoryDto> GetByResourceIdAsync(Guid categoryResourceId);
    Task<CategoryDto> AddAsync(CategoryDto category);
}
