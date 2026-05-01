using StoreBackend.Dto;

namespace StoreBackend.Facade;

public interface ICategoryFacade
{
    Task<List<CategoryDto>> GetAllAsync();
    Task<CategoryDto> AddAsync(CategoryDto category);
}
