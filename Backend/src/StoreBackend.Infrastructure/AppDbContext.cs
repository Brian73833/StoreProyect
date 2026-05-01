using Microsoft.EntityFrameworkCore;
using StoreBackend.Domain.Entities;

namespace StoreBackend.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    public DbSet<Product> Products { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>()
            .Property(p => p.ProductResourceId)
            .HasDefaultValueSql("NEWID()")
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<User>()
            .Property(u => u.UserResourceId)
            .HasDefaultValueSql("NEWID()")
            .ValueGeneratedOnAdd();
    }
}
