using StoreBackend.Domain.Entities;
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

    public async Task<List<Category>> GetAllAsync()
    {
        return await _categoryRepository.GetAllAsync();
    }

    public async Task<Category> AddAsync(CategoryDto category)
    {
        var categoryEntity = new Category
        {
            CategoryResourceId = Guid.NewGuid(),
            Name = category.Name
        };
        return await _categoryRepository.AddAsync(categoryEntity);
    }
}
