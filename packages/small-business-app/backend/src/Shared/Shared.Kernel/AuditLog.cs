namespace Pishgaman.SBA.Shared.Kernel;

public class AuditLog : BaseEntity
{
    public string? ActorId { get; set; }
    public string? Action { get; set; }
    public string? EntityType { get; set; }
    public string? EntityId { get; set; }
    public string? PreviousValues { get; set; }
    public string? NewValues { get; set; }
    public string? Result { get; set; }
    public string? IpAddress { get; set; }
    public string? CorrelationId { get; set; }
}