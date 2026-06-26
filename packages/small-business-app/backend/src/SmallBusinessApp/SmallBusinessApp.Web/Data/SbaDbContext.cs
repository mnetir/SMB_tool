using Microsoft.EntityFrameworkCore;
using Pishgaman.SBA.Domain.Core;
using Pishgaman.SBA.Domain.HR;
using Pishgaman.SBA.Domain.TimeAttendance;
using Pishgaman.SBA.Domain.Payroll;
using Pishgaman.SBA.Domain.Mobile;
using Pishgaman.SBA.Domain.Reports;
using Pishgaman.SBA.Shared.Kernel;

namespace Pishgaman.SBA.Web.Data;

public class SbaDbContext : DbContext
{
    public SbaDbContext(DbContextOptions<SbaDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<OrganizationChart> OrganizationCharts => Set<OrganizationChart>();
    public DbSet<OrganizationNode> OrganizationNodes => Set<OrganizationNode>();
    public DbSet<Position> Positions => Set<Position>();
    public DbSet<Project> Projects => Set<Project>();

    public DbSet<PersonnelProfile> PersonnelProfiles => Set<PersonnelProfile>();
    public DbSet<EmploymentInfo> EmploymentInfos => Set<EmploymentInfo>();
    public DbSet<EmploymentContract> EmploymentContracts => Set<EmploymentContract>();
    public DbSet<ContractAmendment> ContractAmendments => Set<ContractAmendment>();
    public DbSet<ContractCompensationItem> ContractCompensationItems => Set<ContractCompensationItem>();
    public DbSet<InsuranceProfile> InsuranceProfiles => Set<InsuranceProfile>();
    public DbSet<PersonnelDocument> PersonnelDocuments => Set<PersonnelDocument>();
    public DbSet<Dependent> Dependents => Set<Dependent>();
    public DbSet<EducationRecord> EducationRecords => Set<EducationRecord>();
    public DbSet<SkillRecord> SkillRecords => Set<SkillRecord>();
    public DbSet<CertificationRecord> CertificationRecords => Set<CertificationRecord>();

    public DbSet<Shift> Shifts => Set<Shift>();
    public DbSet<ShiftWorkSegment> ShiftWorkSegments => Set<ShiftWorkSegment>();
    public DbSet<ShiftAssignment> ShiftAssignments => Set<ShiftAssignment>();
    public DbSet<RawTraffic> RawTraffic => Set<RawTraffic>();
    public DbSet<AttendanceTransaction> AttendanceTransactions => Set<AttendanceTransaction>();
    public DbSet<AttendancePair> AttendancePairs => Set<AttendancePair>();
    public DbSet<LeaveRequest> LeaveRequests => Set<LeaveRequest>();
    public DbSet<MissionRequest> MissionRequests => Set<MissionRequest>();
    public DbSet<OvertimeRequest> OvertimeRequests => Set<OvertimeRequest>();
    public DbSet<AttendanceDailySummary> AttendanceDailySummaries => Set<AttendanceDailySummary>();
    public DbSet<AttendanceMonthlySummary> AttendanceMonthlySummaries => Set<AttendanceMonthlySummary>();

    public DbSet<PayrollPeriod> PayrollPeriods => Set<PayrollPeriod>();
    public DbSet<PayrollRun> PayrollRuns => Set<PayrollRun>();
    public DbSet<PayrollRunEmployee> PayrollRunEmployees => Set<PayrollRunEmployee>();
    public DbSet<PayrollInputSnapshot> PayrollInputSnapshots => Set<PayrollInputSnapshot>();

    public DbSet<MobileDevice> MobileDevices => Set<MobileDevice>();
    public DbSet<ReportDefinition> ReportDefinitions => Set<ReportDefinition>();
    public DbSet<ReportExecution> ReportExecutions => Set<ReportExecution>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.HasDefaultSchema("sba");
    }
}