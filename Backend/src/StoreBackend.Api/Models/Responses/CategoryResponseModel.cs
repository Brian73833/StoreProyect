namespace StoreBackend.Api.Models.Responses;

public class CategoryResponseModel
{
    public Guid CategoryResourceId { get; set; }
    public string Name { get; set; } = string.Empty;
}
