using StoreBackend.Dto;
using StoreBackend.Infrastructure.Repositories;

namespace StoreBackend.DomainService;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<List<CategoryDto>> GetAllAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return categories.Select(c => new CategoryDto
        {
            CategoryId = c.CategoryId,
            Name = c.Name
        }).ToList();
    }

    public async Task<CategoryDto> AddAsync(CategoryDto category)
    {
        var categoryEntity = new StoreBackend.Domain.Entities.Category
        {
            Name = category.Name
        };
        var result = await _categoryRepository.AddAsync(categoryEntity);
        return new CategoryDto
        {
            CategoryId = result.CategoryId,
            Name = result.Name
        };
    }
}
