using System.ComponentModel.DataAnnotations;
namespace StoreBackend.Api.Models.Requests;

public class CategoryRequestModel
{
    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;
}
