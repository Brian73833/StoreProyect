using Microsoft.AspNetCore.Mvc;
using StoreBackend.Api.Mappers;
using StoreBackend.Api.Models.Requests;
using StoreBackend.Exceptions;
using StoreBackend.Facade;
using Microsoft.AspNetCore.Authorization;

namespace StoreBackend.Api.Controller
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductFacade productFacade;
        private readonly IWebHostEnvironment webHostEnvironment;

        public ProductController(IProductFacade productFacade, IWebHostEnvironment webHostEnvironment)
        {
            this.productFacade = productFacade;
            this.webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var products = await productFacade.GetAllAsync();
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
                var product = await productFacade.GetByIdAsync(id);

                var model = ProductMapper.ToModel(product);
                return Ok(model);
            }
            catch (ResourceNotFoundException)
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddProduct([FromForm] ProductRequestModel product)
        {
            try
            {
                var dto = ProductMapper.ToDto(product);

                if (product.ImageFile != null)
                {
                    string uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "uploads", "products");
                    
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + product.ImageFile.FileName;
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await product.ImageFile.CopyToAsync(fileStream);
                    }

                    dto.ImagePath = Path.Combine("uploads", "products", uniqueFileName).Replace("\\", "/");
                }

                var addedProduct = await productFacade.AddAsync(dto);
                var model = ProductMapper.ToModel(addedProduct);
                return CreatedAtAction(nameof(GetProduct), new { id = model.ProductResourceId }, model);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while adding the product.");
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            try
            {
                await productFacade.DeleteAsync(id);
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
