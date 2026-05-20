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

    public async Task<Category?> GetByResourceIdAsync(Guid categoryResourceId)
    {
        return await _categoryRepository.GetByResourceIdAsync(categoryResourceId);
    }

    public async Task<Category> AddAsync(CategoryDto categoryDto)
    {
        var categoryEntity = new Category
        {
            CategoryResourceId = Guid.NewGuid(),
            Name = categoryDto.Name
        };
        return await _categoryRepository.AddAsync(categoryEntity);
    }
}
