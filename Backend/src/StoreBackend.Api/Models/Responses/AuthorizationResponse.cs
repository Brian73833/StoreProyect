namespace StoreBackend.Api.Models.Responses;

public class AuthorizationResponse
{
    public required string BearerToken { get; set; }
    public DateTime ExpiresIn { get; set; }
    public required UserResponseModel User { get; set; }
}
