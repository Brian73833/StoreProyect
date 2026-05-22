using StoreBackend.DomainService;
using StoreBackend.Dto;
using StoreBackend.Exceptions;
using StoreBackend.Facade.Mappers;
using StoreBackend.Infrastructure;

namespace StoreBackend.Facade;

public class ProductFacade : IProductFacade
{
    private readonly IProductService _productService;
    private readonly AppDbContext _context;

    public ProductFacade(IProductService productService, AppDbContext context)
    {
        _productService = productService;
        _context = context;
    }

    public async Task<ProductDto> AddAsync(ProductDto product)
    {
        var addedProduct = await _productService.AddAsync(product);
        await _context.SaveChangesAsync();
        return ProductMapper.ToDto(addedProduct);
    }

    public async Task DeleteAsync(Guid productResourceId)
    {
        await _productService.DeleteAsync(productResourceId);
        await _context.SaveChangesAsync();
    }

    public async Task<List<ProductDto>> GetAllAsync()
    {
        var products = await _productService.GetAllAsync();
        return ProductMapper.ToDto(products);
    }

    public async Task<ProductDto> GetByResourceIdAsync(Guid productResourceId)
    {
        var product = await _productService.GetByResourceIdAsync(productResourceId);
        if (product == null) throw new ResourceNotFoundException("Product not found");
        return ProductMapper.ToDto(product);
    }

    public async Task<ProductDto> UpdateAsync(Guid productResourceId, ProductDto product)
    {
        var updatedProduct = await _productService.UpdateAsync(productResourceId, product);
        await _context.SaveChangesAsync();
        return ProductMapper.ToDto(updatedProduct);
    }
}
