using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Shared.Kernel;

namespace Domain.Portal.Entities;

public class Product : BaseEntity
{
    [Required, MaxLength(255)]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    // Navigation
    public ICollection<Module> Modules { get; set; } = new List<Module>();
    public ICollection<SalesPlan> SalesPlans { get; set; } = new List<SalesPlan>();
}

public class Module : BaseEntity
{
    public Guid ProductId { get; set; }
    
    [Required, MaxLength(100)]
    public string Code { get; set; } = string.Empty;
    
    [Required, MaxLength(255)]
    public string Name { get; set; } = string.Empty;
    
    public string? Description { get; set; }
    
    public bool IsOptional { get; set; } = true;
    
    // Navigation
    [ForeignKey(nameof(ProductId))]
    public Product Product { get; set; } = null!;
    public ICollection<Permission> Permissions { get; set; } = new List<Permission>();
    public ICollection<PermissionLimit> Limits { get; set; } = new List<PermissionLimit>();
}

public class Permission : BaseEntity
{
    public Guid ModuleId { get; set; }
    
    [Required, MaxLength(100)]
    public string Code { get; set; } = string.Empty;
    
    public string? Description { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    [ForeignKey(nameof(ModuleId))]
    public Module Module { get; set; } = null!;
}

public class PermissionLimit : BaseEntity
{
    public Guid ModuleId { get; set; }
    
    [Required, MaxLength(100)]
    public string Code { get; set; } = string.Empty;
    
    [MaxLength(50)]
    public string? Unit { get; set; }
    
    public int DefaultValue { get; set; }
    
    public string? Description { get; set; }
    
    [ForeignKey(nameof(ModuleId))]
    public Module Module { get; set; } = null!;
}

public class SalesPlan : BaseEntity
{
    public Guid ProductId { get; set; }
    
    [Required, MaxLength(255)]
    public string Name { get; set; } = string.Empty;
    
    [Required, MaxLength(100)]
    public string Code { get; set; } = string.Empty;
    
    public string? Description { get; set; }
    
    [Required, MaxLength(20)]
    public string BillingInterval { get; set; } = "monthly";
    
    [Column(TypeName = "decimal(15,2)")]
    public decimal BasePrice { get; set; }
    
    public bool IsPublic { get; set; } = true;
    public bool IsCustom { get; set; }
    public bool IsTrial { get; set; }
    public int? TrialDays { get; set; }
    
    [ForeignKey(nameof(ProductId))]
    public Product Product { get; set; } = null!;
    public ICollection<PlanPermission> PlanPermissions { get; set; } = new List<PlanPermission>();
    public ICollection<PlanLimit> PlanLimits { get; set; } = new List<PlanLimit>();
}

public class PlanPermission
{
    public Guid PlanId { get; set; }
    public Guid PermissionId { get; set; }
    
    [ForeignKey(nameof(PlanId))]
    public SalesPlan Plan { get; set; } = null!;
    [ForeignKey(nameof(PermissionId))]
    public Permission Permission { get; set; } = null!;
}

public class PlanLimit
{
    public Guid PlanId { get; set; }
    public Guid LimitId { get; set; }
    public int Value { get; set; }
    
    [ForeignKey(nameof(PlanId))]
    public SalesPlan Plan { get; set; } = null!;
    [ForeignKey(nameof(LimitId))]
    public PermissionLimit LimitDef { get; set; } = null!;
}

public class Customer : BaseEntity
{
    [Required, MaxLength(255)]
    public string Name { get; set; } = string.Empty;
    
    [Required, MaxLength(100)]
    public string Alias { get; set; } = string.Empty;
    
    [MaxLength(255)]
    public string? ContactEmail { get; set; }
    
    [MaxLength(50)]
    public string? ContactPhone { get; set; }
    
    [MaxLength(20)]
    public string Status { get; set; } = "active";
    
    public string? Address { get; set; }
    
    [MaxLength(100)]
    public string? TaxId { get; set; }
    
    [MaxLength(100)]
    public string? NationalId { get; set; }
    
    public ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
    public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
}

public class Subscription : BaseEntity
{
    public Guid CustomerId { get; set; }
    public Guid? PlanId { get; set; }
    
    [MaxLength(20)]
    public string Status { get; set; } = "draft";
    
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsTrial { get; set; }
    public DateTime? TrialEndsAt { get; set; }
    
    [ForeignKey(nameof(CustomerId))]
    public Customer Customer { get; set; } = null!;
    [ForeignKey(nameof(PlanId))]
    public SalesPlan? Plan { get; set; }
    
    public ICollection<SubscriptionPermission> SubscriptionPermissions { get; set; } = new List<SubscriptionPermission>();
    public ICollection<SubscriptionLimit> SubscriptionLimits { get; set; } = new List<SubscriptionLimit>();
    public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
    public ICollection<InvoiceAmendment> Amendments { get; set; } = new List<InvoiceAmendment>();
    public License? License { get; set; }
}

public class SubscriptionPermission
{
    public Guid SubscriptionId { get; set; }
    public Guid PermissionId { get; set; }
    public DateTime GrantedAt { get; set; } = DateTime.UtcNow;
    
    [ForeignKey(nameof(SubscriptionId))]
    public Subscription Subscription { get; set; } = null!;
    [ForeignKey(nameof(PermissionId))]
    public Permission Permission { get; set; } = null!;
}

public class SubscriptionLimit
{
    public Guid SubscriptionId { get; set; }
    public Guid LimitId { get; set; }
    public int Value { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    [ForeignKey(nameof(SubscriptionId))]
    public Subscription Subscription { get; set; } = null!;
    [ForeignKey(nameof(LimitId))]
    public PermissionLimit LimitDef { get; set; } = null!;
}

public class Invoice : BaseEntity
{
    public Guid? SubscriptionId { get; set; }
    public Guid CustomerId { get; set; }
    
    [Required, MaxLength(50)]
    public string Number { get; set; } = string.Empty;
    
    [Column(TypeName = "decimal(15,2)")]
    public decimal TotalAmount { get; set; }
    
    [MaxLength(10)]
    public string Currency { get; set; } = "IRR";
    
    [MaxLength(20)]
    public string Status { get; set; } = "unpaid";
    
    public DateTime? DueDate { get; set; }
    public DateTime? PaidAt { get; set; }
    public string? Notes { get; set; }
    
    [ForeignKey(nameof(CustomerId))]
    public Customer Customer { get; set; } = null!;
    [ForeignKey(nameof(SubscriptionId))]
    public Subscription? Subscription { get; set; }
    
    public ICollection<InvoiceItem> Items { get; set; } = new List<InvoiceItem>();
    public ICollection<InvoiceAmendment> Amendments { get; set; } = new List<InvoiceAmendment>();
}

public class InvoiceItem : BaseEntity
{
    public Guid InvoiceId { get; set; }
    
    [Required]
    public string Description { get; set; } = string.Empty;
    
    [Column(TypeName = "decimal(15,2)")]
    public decimal Amount { get; set; }
    
    public int Quantity { get; set; } = 1;
    
    [Required, MaxLength(30)]
    public string Type { get; set; } = string.Empty;
    
    public string? ReferenceId { get; set; }
    
    [ForeignKey(nameof(InvoiceId))]
    public Invoice Invoice { get; set; } = null!;
}

public class InvoiceAmendment : BaseEntity
{
    public Guid SubscriptionId { get; set; }
    public Guid? InvoiceId { get; set; }
    
    [Required, MaxLength(30)]
    public string Type { get; set; } = string.Empty;
    
    public string? Description { get; set; }
    public DateTime EffectiveDate { get; set; }
    public string? Metadata { get; set; } // JSON
    
    [MaxLength(20)]
    public string Status { get; set; } = "applied";
    
    [ForeignKey(nameof(SubscriptionId))]
    public Subscription Subscription { get; set; } = null!;
    [ForeignKey(nameof(InvoiceId))]
    public Invoice? Invoice { get; set; }
}

public class Payment : BaseEntity
{
    public Guid InvoiceId { get; set; }
    
    [Column(TypeName = "decimal(15,2)")]
    public decimal Amount { get; set; }
    
    [Required, MaxLength(30)]
    public string Method { get; set; } = string.Empty;
    
    [MaxLength(255)]
    public string? Reference { get; set; }
    
    public DateTime? PaidAt { get; set; }
    
    [MaxLength(20)]
    public string Status { get; set; } = "pending";
    
    public string? Notes { get; set; }
}

public class License : BaseEntity
{
    public Guid SubscriptionId { get; set; }
    public Guid CustomerId { get; set; }
    
    [Required]
    public string GrantedPermissions { get; set; } = "{}"; // JSON
    
    [Required]
    public string GrantedLimits { get; set; } = "{}"; // JSON
    
    public string? LicenseKey { get; set; }
    public DateTime? ExpiresAt { get; set; }
    public DateTime? LastPushedAt { get; set; }
    
    [ForeignKey(nameof(SubscriptionId))]
    public Subscription Subscription { get; set; } = null!;
    [ForeignKey(nameof(CustomerId))]
    public Customer Customer { get; set; } = null!;
}

public class ProvisioningRequest : BaseEntity
{
    public Guid SubscriptionId { get; set; }
    
    [Required, MaxLength(30)]
    public string Action { get; set; } = string.Empty;
    
    [MaxLength(20)]
    public string Status { get; set; } = "pending";
    
    public string? Metadata { get; set; } // JSON
    public string? Result { get; set; } // JSON
    public string? ErrorMessage { get; set; }
    public DateTime? CompletedAt { get; set; }
}

public class PortalUser : BaseEntity
{
    [Required, MaxLength(100)]
    public string Username { get; set; } = string.Empty;
    
    [Required, MaxLength(255)]
    public string Email { get; set; } = string.Empty;
    
    [MaxLength(255)]
    public string? DisplayName { get; set; }
    
    [Required]
    public string PasswordHash { get; set; } = string.Empty;
    
    [MaxLength(20)]
    public string Status { get; set; } = "active";
    
    public string Roles { get; set; } = "[]"; // JSON array
    public DateTime? LastLoginAt { get; set; }
}

public class Notification : BaseEntity
{
    public Guid? RecipientUserId { get; set; }
    public Guid? CustomerId { get; set; }
    
    [Required, MaxLength(50)]
    public string Type { get; set; } = string.Empty;
    
    [Required, MaxLength(255)]
    public string Title { get; set; } = string.Empty;
    
    public string? Body { get; set; }
    public string? Metadata { get; set; } // JSON
    public bool IsRead { get; set; }
    public DateTime? ReadAt { get; set; }
}

public class AuditLog : BaseEntity
{
    public Guid? ActorUserId { get; set; }
    
    [MaxLength(255)]
    public string? ActorUserName { get; set; }
    
    [Required, MaxLength(100)]
    public string Action { get; set; } = string.Empty;
    
    [Required, MaxLength(100)]
    public string EntityType { get; set; } = string.Empty;
    
    public Guid? EntityId { get; set; }
    public string? Changes { get; set; } // JSON
    public string? IpAddress { get; set; }
    public string? UserAgent { get; set; }
    public string? Description { get; set; }
}