using Microsoft.AspNetCore.Mvc;
using StoreBackend.Api.Mappers;
using StoreBackend.Api.Models.Requests;
using StoreBackend.Exceptions;
using StoreBackend.Facade;

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

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddProduct([FromForm] ProductRequestModel product)
        {
            try
            {
                var dto = ProductMapper.ToDto(product);

                if (product.ImageFile != null)
                {
                    // 1. Definir carpeta de destino
                    string uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "uploads", "products");
                    
                    // Asegurar que la carpeta exista
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    // 2. Generar nombre único
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + product.ImageFile.FileName;
                    string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    // 3. Guardar el archivo físicamente
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await product.ImageFile.CopyToAsync(fileStream);
                    }

                    // 4. Guardar la ruta RELATIVA en el DTO
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
