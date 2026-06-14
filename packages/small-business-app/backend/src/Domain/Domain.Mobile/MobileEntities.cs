using Pishgaman.SBA.Shared.Kernel;

namespace Pishgaman.SBA.Domain.Mobile;

public class MobileDevice : BaseEntity
{
    public Guid? UserId { get; set; }
    public string DeviceId { get; set; } = string.Empty;
    public string? Model { get; set; }
    public string? Os { get; set; }
    public string? PushToken { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime? LastUsedAt { get; set; }
}