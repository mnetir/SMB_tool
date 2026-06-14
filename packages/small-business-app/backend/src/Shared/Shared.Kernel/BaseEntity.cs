using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pishgaman.SBA.Shared.Kernel;

public abstract class BaseEntity
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public abstract class BaseAuditEntity : BaseEntity
{
    public string? CreatedByUserId { get; set; }
    public string? UpdatedByUserId { get; set; }
}