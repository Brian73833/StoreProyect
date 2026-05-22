using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;


namespace StoreBackend.Domain.Entities;


[Table(nameof(UserRole))]
[Index(nameof(UserRoleResourceId), IsUnique = true)]
public class UserRole
{
   public int UserId { get; set; }
   public required User User { get; set; }

   public int RoleId { get; set; }
   public required Role Role { get; set; }

   [Required]
   public Guid UserRoleResourceId { get; set; }
}