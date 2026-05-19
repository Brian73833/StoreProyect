using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace StoreBackend.Api.Services;

public interface IImageService
{
    Task<string> SaveImageAsync(IFormFile imageFile, string subFolder);
    void DeleteImage(string imagePath);
}
