namespace StoreBackend.Dto;

public class CategoryDto
{
    public int CategoryId { get; set; }
    public Guid CategoryResourceId { get; set; }
    public string Name { get; set; } = string.Empty;
}
