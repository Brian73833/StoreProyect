using Microsoft.AspNetCore.Mvc;
using StoreBackend.Api.Mappers;
using StoreBackend.Api.Models.Responses;
using StoreBackend.Dto;
using StoreBackend.Facade;
using Microsoft.AspNetCore.Authorization;
using StoreBackend.Api.Models.Requests;

namespace StoreBackend.Api.Controller;

[Route("api/categories")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly ICategoryFacade _categoryFacade;

    public CategoryController(ICategoryFacade categoryFacade)
    {
        _categoryFacade = categoryFacade;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategoriesAsync()
    {
        try
        {
            var categories = await _categoryFacade.GetAllAsync();
            var categoryModel = CategoryMapper.ToModel(categories);
            return Ok(categoryModel);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving categories.");
        }
    }

    [HttpGet("{categoryResourceId}")]
    public async Task<IActionResult> GetCategoryAsync(Guid categoryResourceId)
    {
        try
        {
            var categoryDto = await _categoryFacade.GetByIdAsync(categoryResourceId);
            if (categoryDto == null) return NotFound();
            var categoryModel = CategoryMapper.ToModel(categoryDto);
            return Ok(categoryModel);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving the category.");
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> AddCategoryAsync([FromBody] CategoryRequestModel categoryRequest)
    {
        try
        {
            var categoryDto = CategoryMapper.ToDto(categoryRequest);
            var addedCategoryDto = await _categoryFacade.AddAsync(categoryDto);
            var categoryModel = CategoryMapper.ToModel(addedCategoryDto);
            return CreatedAtAction(nameof(GetCategoryAsync), new { categoryResourceId = categoryModel.CategoryResourceId }, categoryModel);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while adding the category.");
        }
    }
}
