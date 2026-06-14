using Pishgaman.SBA.Shared.Kernel;

namespace Pishgaman.SBA.Domain.Payroll;

public class PayrollPeriod : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public int Year { get; set; }
    public int? Month { get; set; }
    public DateTime DateFrom { get; set; }
    public DateTime DateTo { get; set; }
    public DateTime? PaymentDate { get; set; }
    public string PaymentCycle { get; set; } = "Monthly";
    public string? StatutoryRulePackageSnapshotId { get; set; }
    public string Status { get; set; } = "Draft";
}

public class PayrollRun : BaseEntity
{
    public Guid PayrollPeriodId { get; set; }
    public string RunCode { get; set; } = string.Empty;
    public string RunType { get; set; } = "Regular";
    public string ScopeType { get; set; } = "Company";
    public Guid? UserId { get; set; }
    public string Status { get; set; } = "Draft";
    public string RequestedByUserId { get; set; } = string.Empty;
    public DateTime? StartedAtUtc { get; set; }
    public DateTime? CompletedAtUtc { get; set; }
    public string? FailureReason { get; set; }
    public Guid? SourceRunId { get; set; }
}

public class PayrollRunEmployee : BaseEntity
{
    public Guid PayrollRunId { get; set; }
    public Guid UserId { get; set; }
    public Guid EmploymentContractId { get; set; }
    public Guid PayrollPeriodId { get; set; }
    public string InclusionReason { get; set; } = "ActiveContract";
    public string? ExclusionReason { get; set; }
    public string Status { get; set; } = "Included";
    public decimal GrossPayAmount { get; set; }
    public decimal EmployeeDeductionAmount { get; set; }
    public decimal EmployerContributionAmount { get; set; }
    public decimal NetPayAmount { get; set; }
    public string CurrencyCode { get; set; } = "IRR";
    public string? CalculationRunHash { get; set; }
}

public class PayrollInputSnapshot : BaseEntity
{
    public Guid PayrollRunEmployeeId { get; set; }
    public Guid UserId { get; set; }
    public Guid EmploymentContractId { get; set; }
    public string ContractSnapshotJson { get; set; } = "{}";
    public string? CompensationSnapshotJson { get; set; }
    public string? AttendanceInputSnapshotJson { get; set; }
    public string? StatutoryRulePackageSnapshotId { get; set; }
    public string? SnapshotHash { get; set; }
}