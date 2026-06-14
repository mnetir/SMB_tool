using Pishgaman.SBA.Shared.Kernel;

namespace Pishgaman.SBA.Domain.Reports;

public class ReportDefinition : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Category { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}

public class ReportExecution : BaseEntity
{
    public Guid ReportDefinitionId { get; set; }
    public string? ParametersJson { get; set; }
    public string Status { get; set; } = "Pending";
    public string? ResultFileAttachmentId { get; set; }
    public string? ErrorMessage { get; set; }
    public string RequestedByUserId { get; set; } = string.Empty;
    public DateTime? CompletedAt { get; set; }
}