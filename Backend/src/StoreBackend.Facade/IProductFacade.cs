using StoreBackend.Dto;

namespace StoreBackend.Facade;

public interface IProductFacade
{
    Task<List<ProductDto>> GetAllAsync();
    Task<ProductDto> GetByIdAsync(Guid productResourceId);
    Task<ProductDto> AddAsync(ProductDto product);
    Task DeleteAsync(Guid productResourceId);
}
