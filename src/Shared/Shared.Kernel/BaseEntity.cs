using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shared.Kernel;

public abstract class BaseEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    public Guid? CreatedByUserId { get; set; }
    
    [MaxLength(255)]
    public string? CreatedByUserName { get; set; }
    
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public Guid? ModifiedByUserId { get; set; }
    
    [MaxLength(255)]
    public string? ModifiedByUserName { get; set; }
    
    public DateTime ModifiedAtUtc { get; set; } = DateTime.UtcNow;
}