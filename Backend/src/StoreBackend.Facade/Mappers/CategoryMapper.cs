using StoreBackend.Dto;
using StoreBackend.Domain.Entities;

namespace StoreBackend.Facade.Mappers;

public class CategoryMapper
{
    public static List<CategoryDto> ToDto(List<Category> categories)
    {
        return categories.Select(c => ToDto(c)).ToList();
    }

    public static CategoryDto ToDto(Category category)
    {
        return new CategoryDto
        {
            CategoryId = category.CategoryId,
            CategoryResourceId = category.CategoryResourceId,
            Name = category.Name
        };
    }
}
