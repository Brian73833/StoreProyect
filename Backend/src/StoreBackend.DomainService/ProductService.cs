using StoreBackend.Domain.Entities;
using StoreBackend.Dto;
using StoreBackend.Exceptions;
using StoreBackend.Infrastructure.Repositories;

namespace StoreBackend.DomainService;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    public ProductService(IProductRepository productRepository, ICategoryRepository categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<Product> AddAsync(ProductDto productDto)
    {
        var category = await _categoryRepository.GetByResourceIdAsync(productDto.CategoryResourceId);
        if (category == null)
        {
            throw new BadRequestResponseException("Category not found");
        }

        var productEntity = new Product
        {
            ProductResourceId = Guid.NewGuid(),
            Name = productDto.Name,
            Description = productDto.Description,
            Price = productDto.Price,
            Stock = productDto.Stock,
            ImagePath = productDto.ImagePath,
            CategoryId = category.CategoryId,
        };
        return await _productRepository.AddAsync(productEntity);
    }

    public async Task DeleteAsync(Guid productResourceId)
    {
        var product = await _productRepository.GetByResourceIdAsync(productResourceId);
        if (product == null) throw new ResourceNotFoundException();
        await _productRepository.DeleteAsync(product);
    }

    public Task<List<Product>> GetAllAsync()
    {
        return _productRepository.GetAllAsync();
    }

    public Task<Product?> GetByResourceIdAsync(Guid productResourceId)
    {
        return _productRepository.GetByResourceIdAsync(productResourceId);
    }

    public async Task<Product> UpdateAsync(Guid productResourceId, ProductDto productDto)
    {
        var product = await _productRepository.GetByResourceIdAsync(productResourceId);
        if (product == null) throw new ResourceNotFoundException("Product not found");

        var category = await _categoryRepository.GetByResourceIdAsync(productDto.CategoryResourceId);
        if (category == null) throw new BadRequestResponseException("Category not found");

        product.Name = productDto.Name;
        product.Description = productDto.Description;
        product.Price = productDto.Price;
        product.Stock = productDto.Stock;
        product.CategoryId = category.CategoryId;        if (productDto.ImagePath != null)
        {
            product.ImagePath = productDto.ImagePath;
        }

        return await _productRepository.UpdateAsync(product);
    }
}
