using System.ComponentModel.DataAnnotations;

namespace StoreBackend.Api.Models.Requests;

public class DeleteUserRequestModel
{
    [Required]
    public string Password { get; set; } = string.Empty;
}
