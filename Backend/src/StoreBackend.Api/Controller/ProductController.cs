using Microsoft.AspNetCore.Mvc;
using StoreBackend.Api.Mappers;
using StoreBackend.Api.Models.Requests;
using StoreBackend.Facade;
using Microsoft.AspNetCore.Authorization;
using StoreBackend.Api.Services;

namespace StoreBackend.Api.Controller
{
    [Route("api/products")]
    [ApiController]
    public class ProductController(IProductFacade productFacade, IImageService imageService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetProductsAsync()
        {
            var products = await productFacade.GetAllAsync();
            var productModel = ProductMapper.ToModel(products);
            return Ok(productModel);
        }

        [HttpGet("{productResourceId}")]
        public async Task<IActionResult> GetProductAsync(Guid productResourceId)
        {
            var productDto = await productFacade.GetByResourceIdAsync(productResourceId);
            var productModel = ProductMapper.ToModel(productDto);
            return Ok(productModel);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddProductAsync([FromForm] ProductRequestModel productRequest)
        {
            var productDto = ProductMapper.ToDto(productRequest);
            if (productRequest.ImageFile != null)
            {
                productDto.ImagePath = await imageService.SaveImageAsync(productRequest.ImageFile, "products");
            }
            var addedProductDto = await productFacade.AddAsync(productDto);
            var productModel = ProductMapper.ToModel(addedProductDto);
            return CreatedAtAction(nameof(GetProductAsync), new { productResourceId = productModel.ProductResourceId }, productModel);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{productResourceId}")]
        public async Task<IActionResult> DeleteProductAsync(Guid productResourceId)
        {
            var productDto = await productFacade.GetByResourceIdAsync(productResourceId);
            await productFacade.DeleteAsync(productResourceId);
            if (!string.IsNullOrEmpty(productDto.ImagePath))
            {
                imageService.DeleteImage(productDto.ImagePath);
            }

            return Ok();
        }
    }
}

