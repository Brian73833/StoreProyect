using StoreBackend.Dto;
using StoreBackend.Domain.Entities;

namespace StoreBackend.Facade.Mappers;

public class ProductMapper
{
    public static List<ProductDto> ToDto(List<Product> products)
    {
        return products.Select(p => ToDto(p)).ToList();
    }

    public static ProductDto ToDto(Product product)
    {
        return new ProductDto
        {
            ProductResourceId = product.ProductResourceId,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            Stock = product.Stock,
            ImagePath = product.ImagePath,
            CategoryId = product.CategoryId,
            CategoryName = product.Category?.Name
        };
    }
}
