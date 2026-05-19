using System;
using StoreBackend.Domain.Entities;

namespace StoreBackend.Api.Models.Responses;

public class ProductResponseModel
{
    public Guid ProductResourceId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string? ImagePath { get; set; }
    public string? CategoryName { get; set; }
}
