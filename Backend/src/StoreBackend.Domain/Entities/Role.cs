using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace StoreBackend.Domain.Entities;

[Table(nameof(Role))]
[Index(nameof(Name), IsUnique = true)]
[Index(nameof(RoleResourceId), IsUnique = true)]

public class Role
{
   [Key]
   [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
   public int Id { get; set; }
   
   [Required]
   public Guid RoleResourceId { get; set; }
   
   [MaxLength(100)]
   [Required]
   public required string Name { get; set; }
   public List<UserRole> UserRoles { get; set; } = [];
}