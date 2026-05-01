using StoreBackend.DomainService;
using StoreBackend.Dto;
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
        return await _categoryService.GetAllAsync();
    }

    public async Task<CategoryDto> AddAsync(CategoryDto category)
    {
        var result = await _categoryService.AddAsync(category);
        await _context.SaveChangesAsync();
        return result;
    }
}
