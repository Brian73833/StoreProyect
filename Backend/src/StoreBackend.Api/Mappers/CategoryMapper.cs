using StoreBackend.Api.Models.Requests;
using StoreBackend.Api.Models.Responses;
using StoreBackend.Dto;

namespace StoreBackend.Api.Mappers;

public class CategoryMapper
{
    public static List<CategoryResponseModel> ToModel(List<CategoryDto> dtos)
    {
        return dtos.Select(d => ToModel(d)).ToList();
    }

    public static CategoryResponseModel ToModel(CategoryDto dto)
    {
        return new CategoryResponseModel
        {
            CategoryId = dto.CategoryId,
            Name = dto.Name
        };
    }

    public static CategoryDto ToDto(CategoryRequestModel model)
    {
        return new CategoryDto
        {
            Name = model.Name
        };
    }
}
