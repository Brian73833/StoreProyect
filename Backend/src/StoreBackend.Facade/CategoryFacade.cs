using StoreBackend.DomainService;
using StoreBackend.Dto;
using StoreBackend.Exceptions;
using StoreBackend.Facade.Mappers;
using StoreBackend.Infrastructure;

namespace StoreBackend.Facade;

public class CategoryFacade : ICategoryFacade
{
    private readonly ICategoryService _categoryService;
    private readonly AppDbContext _context;

    public CategoryFacade(ICategoryService categoryService, AppDbContext context)
    {
        _categoryService = categoryService;
        _context = context;
    }

    public async Task<List<CategoryDto>> GetAllAsync()
    {
        var categories = await _categoryService.GetAllAsync();
        return CategoryMapper.ToDto(categories);
    }

    public async Task<CategoryDto> GetByResourceIdAsync(Guid categoryResourceId)
    {
        var category = await _categoryService.GetByResourceIdAsync(categoryResourceId);
        if (category == null) throw new ResourceNotFoundException("Category not found");
        return CategoryMapper.ToDto(category);
    }

    public async Task<CategoryDto> AddAsync(CategoryDto category)
    {
        var addedCategory = await _categoryService.AddAsync(category);
        await _context.SaveChangesAsync();
        return CategoryMapper.ToDto(addedCategory);
    }
}
