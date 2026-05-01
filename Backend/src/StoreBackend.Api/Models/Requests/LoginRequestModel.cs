using System.ComponentModel.DataAnnotations;

namespace StoreBackend.Api.Models.Requests;

public class LoginRequestModel
{
    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}
