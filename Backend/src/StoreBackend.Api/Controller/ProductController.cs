using Microsoft.AspNetCore.Mvc;
using StoreBackend.Api.Mappers;
using StoreBackend.Api.Models.Requests;
using StoreBackend.Exceptions;
using StoreBackend.Facade;
using Microsoft.AspNetCore.Authorization;
using StoreBackend.Api.Services;

namespace StoreBackend.Api.Controller
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductFacade _productFacade;
        private readonly IImageService _imageService;

        public ProductController(IProductFacade productFacade, IImageService imageService)
        {
            _productFacade = productFacade;
            _imageService = imageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var products = await _productFacade.GetAllAsync();
                var models = ProductMapper.ToModel(products);
                return Ok(models);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving products.");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(Guid id)
        {
            try
            {
                var product = await _productFacade.GetByIdAsync(id);

                var model = ProductMapper.ToModel(product);
                return Ok(model);
            }
            catch (ResourceNotFoundException)
            {
                return NotFound();
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddProduct([FromForm] ProductRequestModel productRequest)
        {
            try
            {
                var dto = ProductMapper.ToDto(productRequest);

                if (productRequest.ImageFile != null)
                {
                    dto.ImagePath = await _imageService.SaveImageAsync(productRequest.ImageFile, "products");
                }

                var addedProductDto = await _productFacade.AddAsync(dto);
                var model = ProductMapper.ToModel(addedProductDto);
                return CreatedAtAction(nameof(GetProduct), new { id = model.ProductResourceId }, model);
            }
            catch (BadRequestResponseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while adding the product.");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            try
            {
                var product = await _productFacade.GetByIdAsync(id);

                await _productFacade.DeleteAsync(id);

                if (!string.IsNullOrEmpty(product.ImagePath))
                {
                    _imageService.DeleteImage(product.ImagePath);
                }

                return Ok();
            }
            catch (ResourceNotFoundException)
            {
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the product.");
            }
        }
    }
}
