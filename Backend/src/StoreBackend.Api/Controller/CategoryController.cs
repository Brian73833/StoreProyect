using Microsoft.AspNetCore.Mvc;
using StoreBackend.Api.Models.Responses;
using StoreBackend.Dto;
using StoreBackend.Facade;
using Microsoft.AspNetCore.Authorization;

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
    public async Task<IActionResult> GetCategories()
    {
        try
        {
            var categories = await _categoryFacade.GetAllAsync();
            var models = categories.Select(c => new CategoryResponseModel
            {
                CategoryId = c.CategoryId,
                Name = c.Name
            }).ToList();
            return Ok(models);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving categories.");
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> AddCategory([FromBody] CategoryDto category)
    {
        try
        {
            var result = await _categoryFacade.AddAsync(category);
            return CreatedAtAction(nameof(GetCategories), new { id = result.CategoryId }, result);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while adding the category.");
        }
    }
}
