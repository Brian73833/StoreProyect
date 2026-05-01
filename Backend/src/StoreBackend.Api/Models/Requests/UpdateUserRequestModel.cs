using System.ComponentModel.DataAnnotations;

namespace StoreBackend.Api.Models.Requests;

public class UpdateUserRequestModel
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(100)]
    public string Email { get; set; } = string.Empty;

    public string? CurrentPassword { get; set; }

    public string? NewPassword { get; set; }
}
