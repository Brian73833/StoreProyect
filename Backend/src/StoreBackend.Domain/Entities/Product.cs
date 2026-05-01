using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StoreBackend.Domain.Entities;

[Table("Product")]
public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ProductId { get; private set; }

    [Required]
    public Guid ProductResourceId { get; set; }

    [Required]
    [Column("Name")]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Column("Description")]
    [StringLength(255)]
    public string? Description { get; set; }

    [Required]
    [Column("Price", TypeName = "decimal(10, 2)")]
    public decimal Price { get; set; }

    [Required]
    [Column("Stock")]
    public int Stock { get; set; }

    [Column("ImagePath")]
    [StringLength(500)]
    public string? ImagePath { get; set; }

    [Required]
    [Column("CategoryId")]
    public int CategoryId { get; set; }

    [ForeignKey("CategoryId")]
    public Category? Category { get; set; }
}