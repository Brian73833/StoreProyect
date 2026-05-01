using System;
using StoreBackend.Dto;
using StoreBackend.Api.Models.Responses;
using StoreBackend.Api.Models.Requests;

namespace StoreBackend.Api.Mappers;

public class ProductMapper
{
    public static ProductDto ToDto(ProductRequestModel model)
    {
        return new ProductDto
        {
            Name = model.Name,
            Description = model.Description,
            Price = model.Price,
            Stock = model.Stock,
            CategoryId = model.CategoryId
        };
    }

    public static List<ProductResponseModel> ToModel(List<ProductDto> products)
    {
        return products.Select(p => ToModel(p)).ToList();
    }

    public static ProductResponseModel ToModel(ProductDto product)
    {
        return new ProductResponseModel
        {
            ProductResourceId = product.ProductResourceId,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            Stock = product.Stock,
            ImagePath = product.ImagePath,
            CategoryId = product.CategoryId,
            CategoryName = product.CategoryName
        };
    }
}