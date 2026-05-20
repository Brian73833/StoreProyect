using System;
using StoreBackend.Domain.Entities;

namespace StoreBackend.Infrastructure.Repositories;

public interface IProductRepository
{
    Task<List<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(Guid productResourceId);
    Task<Product> AddAsync(Product product);
    Task DeleteAsync(Product product);
}
