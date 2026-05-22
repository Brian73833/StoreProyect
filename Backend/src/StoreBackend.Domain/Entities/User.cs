using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StoreBackend.Domain.Entities;

[Table("User")]
public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UserId { get; private set; }

    [Required]
    public Guid UserResourceId { get; set; }

    [Required]
    [Column("Name")]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [Column("Email")]
    [StringLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [Column("PasswordHash")]
    [StringLength(255)]
    public string PasswordHash { get; set; } = string.Empty;


    public List<UserRole> UserRoles { get; set; } = [];

    public void ClearRoles()
    {
        UserRoles.Clear();
    }
}