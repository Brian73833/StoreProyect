using System;

namespace StoreBackend.Dto;

public class ProductDto
{
    public Guid ProductResourceId { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int Stock { get; set; }

    public string? ImagePath { get; set; }

    public int CategoryId { get; set; }
    
    public string? CategoryName { get; set; }
}
