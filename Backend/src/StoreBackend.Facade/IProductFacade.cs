using StoreBackend.Dto;

namespace StoreBackend.Facade;

public interface IProductFacade
{
    Task<List<ProductDto>> GetAllAsync();
    Task<ProductDto> GetByResourceIdAsync(Guid productResourceId);
    Task<ProductDto> AddAsync(ProductDto product);
    Task DeleteAsync(Guid productResourceId);
    Task<ProductDto> UpdateAsync(Guid productResourceId, ProductDto product);
}
