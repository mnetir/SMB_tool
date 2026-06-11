using Microsoft.EntityFrameworkCore;
using Domain.Portal.Entities;

namespace CustomerPortal.Api.Data;

public class PortalDbContext : DbContext
{
    public PortalDbContext(DbContextOptions<PortalDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Module> Modules => Set<Module>();
    public DbSet<Permission> Permissions => Set<Permission>();
    public DbSet<PermissionLimit> PermissionLimits => Set<PermissionLimit>();
    public DbSet<SalesPlan> SalesPlans => Set<SalesPlan>();
    public DbSet<PlanPermission> PlanPermissions => Set<PlanPermission>();
    public DbSet<PlanLimit> PlanLimits => Set<PlanLimit>();
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Subscription> Subscriptions => Set<Subscription>();
    public DbSet<SubscriptionPermission> SubscriptionPermissions => Set<SubscriptionPermission>();
    public DbSet<SubscriptionLimit> SubscriptionLimits => Set<SubscriptionLimit>();
    public DbSet<Invoice> Invoices => Set<Invoice>();
    public DbSet<InvoiceItem> InvoiceItems => Set<InvoiceItem>();
    public DbSet<InvoiceAmendment> InvoiceAmendments => Set<InvoiceAmendment>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<License> Licenses => Set<License>();
    public DbSet<ProvisioningRequest> ProvisioningRequests => Set<ProvisioningRequest>();
    public DbSet<PortalUser> PortalUsers => Set<PortalUser>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Composite keys
        modelBuilder.Entity<PlanPermission>()
            .HasKey(pp => new { pp.PlanId, pp.PermissionId });

        modelBuilder.Entity<PlanLimit>()
            .HasKey(pl => new { pl.PlanId, pl.LimitId });

        modelBuilder.Entity<SubscriptionPermission>()
            .HasKey(sp => new { sp.SubscriptionId, sp.PermissionId });

        modelBuilder.Entity<SubscriptionLimit>()
            .HasKey(sl => new { sl.SubscriptionId, sl.LimitId });

        // Unique indexes
        modelBuilder.Entity<Module>().HasIndex(m => m.Code).IsUnique();
        modelBuilder.Entity<Permission>().HasIndex(p => p.Code).IsUnique();
        modelBuilder.Entity<PermissionLimit>().HasIndex(pl => pl.Code).IsUnique();
        modelBuilder.Entity<SalesPlan>().HasIndex(sp => sp.Code).IsUnique();
        modelBuilder.Entity<Customer>().HasIndex(c => c.Alias).IsUnique();
        modelBuilder.Entity<Invoice>().HasIndex(i => i.Number).IsUnique();
        modelBuilder.Entity<PortalUser>().HasIndex(u => u.Username).IsUnique();
        modelBuilder.Entity<PortalUser>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.Entity<License>().HasIndex(l => l.SubscriptionId).IsUnique();
        
        // JSON serialization handled as string for SQLite/PostgreSQL compatibility
        // In production with PostgreSQL, use .HasColumnType("jsonb") for JSON fields
    }
}