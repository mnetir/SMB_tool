using Pishgaman.SBA.Shared.Kernel;

namespace Pishgaman.SBA.Domain.Core;

public class User : BaseEntity
{
    public string Username { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsEmployee { get; set; }
    public bool IsSystemAdmin { get; set; }
    public DateTime? LastLoginAtUtc { get; set; }
}

public class OrganizationChart : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ChartType { get; set; } = "Company";
    public bool IsActive { get; set; } = true;
}

public class OrganizationNode : BaseEntity
{
    public Guid OrganizationChartId { get; set; }
    public Guid? ParentOrganizationNodeId { get; set; }
    public string NodeType { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }
}

public class Position : BaseEntity
{
    public Guid PositionChartId { get; set; }
    public Guid? ParentPositionId { get; set; }
    public string PositionCode { get; set; } = string.Empty;
    public string PositionTitle { get; set; } = string.Empty;
    public Guid? OrganizationNodeId { get; set; }
    public bool IsActive { get; set; } = true;
}

public class Project : BaseEntity
{
    public string ProjectCode { get; set; } = string.Empty;
    public string ProjectTitle { get; set; } = string.Empty;
    public string Status { get; set; } = "Active";
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? CustomerOrClientName { get; set; }
}