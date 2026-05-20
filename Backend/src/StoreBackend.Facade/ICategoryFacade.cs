using StoreBackend.Dto;

namespace StoreBackend.Facade;

public interface ICategoryFacade
{
    Task<List<CategoryDto>> GetAllAsync();
    Task<CategoryDto?> GetByIdAsync(Guid categoryResourceId);
    Task<CategoryDto> AddAsync(CategoryDto category);
}
