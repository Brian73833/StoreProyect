using Microsoft.AspNetCore.Mvc;
using StoreBackend.Api.Mappers;
using StoreBackend.Facade;
using Microsoft.AspNetCore.Authorization;
using StoreBackend.Api.Models.Requests;
using StoreBackend.DomainService;

namespace StoreBackend.Api.Controller;

[Route("api/categories")]
[ApiController]
public class CategoryController(ICategoryFacade categoryFacade) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCategoriesAsync()
    {
        var categories = await categoryFacade.GetAllAsync();
        var categoryModel = CategoryMapper.ToModel(categories);
        return Ok(categoryModel);
    }

    [HttpGet("{categoryResourceId}")]
    public async Task<IActionResult> GetCategoryAsync(Guid categoryResourceId)
    {
        var categoryDto = await categoryFacade.GetByResourceIdAsync(categoryResourceId);
        var categoryModel = CategoryMapper.ToModel(categoryDto);
        return Ok(categoryModel);
    }

    [Authorize(Roles = RoleNames.Administrator)]
    [HttpPost]
    public async Task<IActionResult> AddCategoryAsync([FromBody] CategoryRequestModel categoryRequest)
    {
        var categoryDto = CategoryMapper.ToDto(categoryRequest);
        var addedCategoryDto = await categoryFacade.AddAsync(categoryDto);
        var categoryModel = CategoryMapper.ToModel(addedCategoryDto);
        return CreatedAtAction(nameof(GetCategoryAsync), new { categoryResourceId = categoryModel.CategoryResourceId }, categoryModel);
    }
}

