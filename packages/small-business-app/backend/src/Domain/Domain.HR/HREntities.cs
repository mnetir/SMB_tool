using Pishgaman.SBA.Shared.Kernel;

namespace Pishgaman.SBA.Domain.HR;

public class PersonnelProfile : BaseEntity
{
    public Guid UserId { get; set; }
    public string PersonnelNumber { get; set; } = string.Empty;
    public string? NationalCode { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? FatherName { get; set; }
    public DateTime? BirthDate { get; set; }
    public string? Gender { get; set; }
    public string? MaritalStatus { get; set; }
    public string? Mobile { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
}

public class EmploymentInfo : BaseEntity
{
    public Guid UserId { get; set; }
    public DateTime HireDate { get; set; }
    public string? EmploymentCategoryId { get; set; }
    public string EmploymentStatus { get; set; } = "Active";
    public DateTime? ProbationStartDate { get; set; }
    public DateTime? ProbationEndDate { get; set; }
    public string? JobGradeId { get; set; }
    public string? InsuranceProfileId { get; set; }
    public string? BankName { get; set; }
    public string? BankAccountNumber { get; set; }
    public string? CostCenter { get; set; }
}

public class EmploymentContract : BaseEntity
{
    public Guid UserId { get; set; }
    public string ContractNumber { get; set; } = string.Empty;
    public string ContractType { get; set; } = string.Empty;
    public string? EmploymentCategoryId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string ContractStatus { get; set; } = "Draft";
    public string? WorkLocationType { get; set; }
    public Guid? WorkOrganizationNodeId { get; set; }
    public string? WorkLocationText { get; set; }
    public string? PaymentCycle { get; set; } = "Monthly";
    public Guid? ProjectId { get; set; }
}

public class ContractAmendment : BaseEntity
{
    public Guid EmploymentContractId { get; set; }
    public string AmendmentNumber { get; set; } = string.Empty;
    public string AmendmentType { get; set; } = string.Empty;
    public DateTime EffectiveDate { get; set; }
    public DateTime? EffectiveTo { get; set; }
    public string? Description { get; set; }
    public string? PreviousValueJson { get; set; }
    public string? NewValueJson { get; set; }
    public string Status { get; set; } = "Draft";
}

public class ContractCompensationItem : BaseEntity
{
    public Guid EmploymentContractId { get; set; }
    public string? PayrollComponentDefSnapshotId { get; set; }
    public string ComponentCode { get; set; } = string.Empty;
    public string? ComponentTitleSnapshot { get; set; }
    public decimal Amount { get; set; }
    public int? Quantity { get; set; }
    public decimal? Rate { get; set; }
    public string CalculationType { get; set; } = "Fixed";
    public DateTime EffectiveFrom { get; set; }
    public DateTime? EffectiveTo { get; set; }
}

public class InsuranceProfile : BaseEntity
{
    public Guid UserId { get; set; }
    public string? InsuranceNumber { get; set; }
    public string? InsuranceType { get; set; }
    public DateTime? InsuranceStartDate { get; set; }
    public DateTime? InsuranceEndDate { get; set; }
    public string InsuranceStatus { get; set; } = "Active";
}

public class PersonnelDocument : BaseEntity
{
    public Guid UserId { get; set; }
    public string AttachmentId { get; set; } = string.Empty;
    public string DocumentType { get; set; } = string.Empty;
    public string? DocumentNumber { get; set; }
    public DateTime? IssueDate { get; set; }
    public DateTime? ExpirationDate { get; set; }
    public string? Issuer { get; set; }
    public string? Description { get; set; }
    public string Status { get; set; } = "Active";
}

public class Dependent : BaseEntity
{
    public Guid UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string? Relationship { get; set; }
    public DateTime? BirthDate { get; set; }
    public string? NationalCode { get; set; }
}

public class EducationRecord : BaseEntity
{
    public Guid UserId { get; set; }
    public string Degree { get; set; } = string.Empty;
    public string FieldOfStudy { get; set; } = string.Empty;
    public string Institution { get; set; } = string.Empty;
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}

public class SkillRecord : BaseEntity
{
    public Guid UserId { get; set; }
    public string SkillName { get; set; } = string.Empty;
    public string? Level { get; set; }
}

public class CertificationRecord : BaseEntity
{
    public Guid UserId { get; set; }
    public string CertificationName { get; set; } = string.Empty;
    public string? IssuingAuthority { get; set; }
    public string? CertificationNumber { get; set; }
    public DateTime? IssueDate { get; set; }
    public DateTime? ExpirationDate { get; set; }
}