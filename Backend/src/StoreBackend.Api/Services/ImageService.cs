using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using StoreBackend.Exceptions;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace StoreBackend.Api.Services;

public class ImageService : IImageService
{
    private readonly IWebHostEnvironment _webHostEnvironment;

    public ImageService(IWebHostEnvironment webHostEnvironment)
    {
        _webHostEnvironment = webHostEnvironment;
    }

    public async Task<string> SaveImageAsync(IFormFile imageFile, string subFolder)
    {
        if (imageFile.Length > 5 * 1024 * 1024)
        {
            throw new BadRequestResponseException("El archivo de imagen no puede superar los 5MB.");
        }

        var allowedExtensions = new[] { ".jpg", ".png" };
        var extension = Path.GetExtension(imageFile.FileName).ToLowerInvariant();
        if (string.IsNullOrEmpty(extension) || !allowedExtensions.Contains(extension))
        {
            throw new BadRequestResponseException("Tipo de archivo no permitido. Solo se permiten imágenes (jpg o png).");
        }

        var allowedContentTypes = new[] { "image/jpeg", "image/png" };
        if (!allowedContentTypes.Contains(imageFile.ContentType.ToLowerInvariant()))
        {
            throw new BadRequestResponseException("El Content-Type del archivo no es válido.");
        }

        string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", subFolder);
        
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        string uniqueFileName = Guid.NewGuid().ToString() + extension;
        string filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await imageFile.CopyToAsync(fileStream);
        }

        return Path.Combine("uploads", subFolder, uniqueFileName).Replace("\\", "/");
    }

    public void DeleteImage(string imagePath)
    {
        if (string.IsNullOrEmpty(imagePath)) return;

        string absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, imagePath);
        if (File.Exists(absolutePath))
        {
            File.Delete(absolutePath);
        }
    }
}
