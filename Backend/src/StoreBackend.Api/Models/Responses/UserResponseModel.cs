namespace StoreBackend.Api.Models.Responses;

public class UserResponseModel
{
    public Guid UserResourceId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsAdmin { get; set; }
}