using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace StoreBackend.Domain.Entities;

[Table("Category")]
public class Category
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CategoryId { get; private set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = null!;
}
