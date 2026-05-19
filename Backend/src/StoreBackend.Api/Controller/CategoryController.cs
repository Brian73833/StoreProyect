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
    public async Task<IActionResult> GetCategories()
    {
        try
        {
            var categories = await _categoryFacade.GetAllAsync();
            var models = CategoryMapper.ToModel(categories);
            return Ok(models);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving categories.");
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> AddCategory([FromBody] CategoryRequestModel categoryRequest)
    {
        try
        {
            var dto = CategoryMapper.ToDto(categoryRequest);
            var result = await _categoryFacade.AddAsync(dto);
            var model = CategoryMapper.ToModel(result);
            return CreatedAtAction(nameof(GetCategories), new { id = model.CategoryId }, model);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while adding the category.");
        }
    }
}
