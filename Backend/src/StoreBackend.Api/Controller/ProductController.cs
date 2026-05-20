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
        public async Task<IActionResult> GetProductsAsync()
        {
            try
            {
                var products = await _productFacade.GetAllAsync();
                var productModel = ProductMapper.ToModel(products);
                return Ok(productModel);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving products.");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductAsync(Guid id)
        {
            try
            {
                var productDto = await _productFacade.GetByIdAsync(id);
                var productModel = ProductMapper.ToModel(productDto);
                return Ok(productModel);
            }
            catch (ResourceNotFoundException)
            {
                return NotFound();
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddProductAsync([FromForm] ProductRequestModel productRequest)
        {
            try
            {
                var productDto = ProductMapper.ToDto(productRequest);
                if (productRequest.ImageFile != null)
                {
                    productDto.ImagePath = await _imageService.SaveImageAsync(productRequest.ImageFile, "products");
                }
                var addedProductDto = await _productFacade.AddAsync(productDto);
                var productModel = ProductMapper.ToModel(addedProductDto);
                return CreatedAtAction(nameof(GetProductAsync), new { id = productModel.ProductResourceId }, productModel);
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
        public async Task<IActionResult> DeleteProductAsync(Guid id)
        {
            try
            {
                var productDto = await _productFacade.GetByIdAsync(id);
                await _productFacade.DeleteAsync(id);
                if (!string.IsNullOrEmpty(productDto.ImagePath))
                {
                    _imageService.DeleteImage(productDto.ImagePath);
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
