using StoreBackend.DomainService;
using StoreBackend.Dto;
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
        var entities = await _categoryService.GetAllAsync();
        return CategoryMapper.ToDto(entities);
    }

    public async Task<CategoryDto> AddAsync(CategoryDto category)
    {
        var result = await _categoryService.AddAsync(category);
        await _context.SaveChangesAsync();
        return CategoryMapper.ToDto(result);
    }
}
