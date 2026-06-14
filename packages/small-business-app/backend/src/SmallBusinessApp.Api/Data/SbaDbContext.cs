using Microsoft.EntityFrameworkCore;

namespace Pishgaman.SBA.Api.Data;

public class SbaDbContext : DbContext
{
    public SbaDbContext(DbContextOptions<SbaDbContext> options) : base(options) { }

    public DbSet<Pishgaman.SBA.Domain.Core.User> Users => Set<Pishgaman.SBA.Domain.Core.User>();
    public DbSet<Pishgaman.SBA.Domain.Core.OrganizationChart> OrganizationCharts => Set<Pishgaman.SBA.Domain.Core.OrganizationChart>();
    public DbSet<Pishgaman.SBA.Domain.Core.OrganizationNode> OrganizationNodes => Set<Pishgaman.SBA.Domain.Core.OrganizationNode>();
    public DbSet<Pishgaman.SBA.Domain.Core.Position> Positions => Set<Pishgaman.SBA.Domain.Core.Position>();
    public DbSet<Pishgaman.SBA.Domain.Core.Project> Projects => Set<Pishgaman.SBA.Domain.Core.Project>();

    public DbSet<Pishgaman.SBA.Domain.HR.PersonnelProfile> PersonnelProfiles => Set<Pishgaman.SBA.Domain.HR.PersonnelProfile>();
    public DbSet<Pishgaman.SBA.Domain.HR.EmploymentInfo> EmploymentInfos => Set<Pishgaman.SBA.Domain.HR.EmploymentInfo>();
    public DbSet<Pishgaman.SBA.Domain.HR.EmploymentContract> EmploymentContracts => Set<Pishgaman.SBA.Domain.HR.EmploymentContract>();
    public DbSet<Pishgaman.SBA.Domain.HR.ContractAmendment> ContractAmendments => Set<Pishgaman.SBA.Domain.HR.ContractAmendment>();
    public DbSet<Pishgaman.SBA.Domain.HR.ContractCompensationItem> ContractCompensationItems => Set<Pishgaman.SBA.Domain.HR.ContractCompensationItem>();
    public DbSet<Pishgaman.SBA.Domain.HR.InsuranceProfile> InsuranceProfiles => Set<Pishgaman.SBA.Domain.HR.InsuranceProfile>();
    public DbSet<Pishgaman.SBA.Domain.HR.PersonnelDocument> PersonnelDocuments => Set<Pishgaman.SBA.Domain.HR.PersonnelDocument>();
    public DbSet<Pishgaman.SBA.Domain.HR.Dependent> Dependents => Set<Pishgaman.SBA.Domain.HR.Dependent>();
    public DbSet<Pishgaman.SBA.Domain.HR.EducationRecord> EducationRecords => Set<Pishgaman.SBA.Domain.HR.EducationRecord>();
    public DbSet<Pishgaman.SBA.Domain.HR.SkillRecord> SkillRecords => Set<Pishgaman.SBA.Domain.HR.SkillRecord>();
    public DbSet<Pishgaman.SBA.Domain.HR.CertificationRecord> CertificationRecords => Set<Pishgaman.SBA.Domain.HR.CertificationRecord>();

    public DbSet<Pishgaman.SBA.Domain.TimeAttendance.Shift> Shifts => Set<Pishgaman.SBA.Domain.TimeAttendance.Shift>();
    public DbSet<Pishgaman.SBA.Domain.TimeAttendance.ShiftWorkSegment> ShiftWorkSegments => Set<Pishgaman.SBA.Domain.TimeAttendance.ShiftWorkSegment>();
    public DbSet<Pishgaman.SBA.Domain.TimeAttendance.ShiftAssignment> ShiftAssignments => Set<Pishgaman.SBA.Domain.TimeAttendance.ShiftAssignment>();
    public DbSet<Pishgaman.SBA.Domain.TimeAttendance.RawTraffic> RawTraffic => Set<Pishgaman.SBA.Domain.TimeAttendance.RawTraffic>();
    public DbSet<Pishgaman.SBA.Domain.TimeAttendance.AttendanceTransaction> AttendanceTransactions => Set<Pishgaman.SBA.Domain.TimeAttendance.AttendanceTransaction>();
    public DbSet<Pishgaman.SBA.Domain.TimeAttendance.AttendancePair> AttendancePairs => Set<Pishgaman.SBA.Domain.TimeAttendance.AttendancePair>();
    public DbSet<Pishgaman.SBA.Domain.TimeAttendance.LeaveRequest> LeaveRequests => Set<Pishgaman.SBA.Domain.TimeAttendance.LeaveRequest>();
    public DbSet<Pishgaman.SBA.Domain.TimeAttendance.MissionRequest> MissionRequests => Set<Pishgaman.SBA.Domain.TimeAttendance.MissionRequest>();
    public DbSet<Pishgaman.SBA.Domain.TimeAttendance.OvertimeRequest> OvertimeRequests => Set<Pishgaman.SBA.Domain.TimeAttendance.OvertimeRequest>();
    public DbSet<Pishgaman.SBA.Domain.TimeAttendance.AttendanceDailySummary> AttendanceDailySummaries => Set<Pishgaman.SBA.Domain.TimeAttendance.AttendanceDailySummary>();
    public DbSet<Pishgaman.SBA.Domain.TimeAttendance.AttendanceMonthlySummary> AttendanceMonthlySummaries => Set<Pishgaman.SBA.Domain.TimeAttendance.AttendanceMonthlySummary>();

    public DbSet<Pishgaman.SBA.Domain.Payroll.PayrollPeriod> PayrollPeriods => Set<Pishgaman.SBA.Domain.Payroll.PayrollPeriod>();
    public DbSet<Pishgaman.SBA.Domain.Payroll.PayrollRun> PayrollRuns => Set<Pishgaman.SBA.Domain.Payroll.PayrollRun>();
    public DbSet<Pishgaman.SBA.Domain.Payroll.PayrollRunEmployee> PayrollRunEmployees => Set<Pishgaman.SBA.Domain.Payroll.PayrollRunEmployee>();
    public DbSet<Pishgaman.SBA.Domain.Payroll.PayrollInputSnapshot> PayrollInputSnapshots => Set<Pishgaman.SBA.Domain.Payroll.PayrollInputSnapshot>();

    public DbSet<Pishgaman.SBA.Domain.Mobile.MobileDevice> MobileDevices => Set<Pishgaman.SBA.Domain.Mobile.MobileDevice>();
    public DbSet<Pishgaman.SBA.Domain.Reports.ReportDefinition> ReportDefinitions => Set<Pishgaman.SBA.Domain.Reports.ReportDefinition>();
    public DbSet<Pishgaman.SBA.Domain.Reports.ReportExecution> ReportExecutions => Set<Pishgaman.SBA.Domain.Reports.ReportExecution>();
    public DbSet<Pishgaman.SBA.Shared.Kernel.AuditLog> AuditLogs => Set<Pishgaman.SBA.Shared.Kernel.AuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.HasDefaultSchema("sba");
    }
}