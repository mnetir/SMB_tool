using Pishgaman.SBA.Shared.Kernel;

namespace Pishgaman.SBA.Domain.TimeAttendance;

public class Shift : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ShiftType { get; set; } = string.Empty; // Static, Circular, WorkTime
    public string? DailyAttendanceRuleId { get; set; }
    public int? RequiredWorkMinutes { get; set; }
    public bool AllowsFloating { get; set; }
    public string HolidayBehavior { get; set; } = "PaidHoliday";
    public bool IsActive { get; set; } = true;
}

public class ShiftWorkSegment : BaseEntity
{
    public Guid ShiftId { get; set; }
    public int SegmentIndex { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public TimeOnly? EntryWindowStart { get; set; }
    public TimeOnly? EntryWindowEnd { get; set; }
    public TimeOnly? ExitWindowStart { get; set; }
    public TimeOnly? ExitWindowEnd { get; set; }
    public int? RequiredMinutes { get; set; }
    public int BreakMinutes { get; set; }
}

public class ShiftAssignment : BaseEntity
{
    public string AssignmentScope { get; set; } = string.Empty;
    public Guid? UserId { get; set; }
    public Guid? OrganizationNodeId { get; set; }
    public Guid? PositionId { get; set; }
    public Guid? ProjectId { get; set; }
    public Guid? ShiftId { get; set; }
    public Guid? ShiftTemplateId { get; set; }
    public DateTime? CycleStartDate { get; set; }
    public DateTime EffectiveFrom { get; set; }
    public DateTime? EffectiveTo { get; set; }
    public int Priority { get; set; }
    public string AssignmentStatus { get; set; } = "Active";
}

public class RawTraffic : BaseEntity
{
    public string SourceType { get; set; } = string.Empty;
    public string? AttendanceDeviceId { get; set; }
    public string? DeviceUserCode { get; set; }
    public DateTime RawDateTime { get; set; }
    public DateTime ReceivedAtUtc { get; set; } = DateTime.UtcNow;
    public string? RawPayloadJson { get; set; }
    public string? ExternalTransactionId { get; set; }
    public string IngestionStatus { get; set; } = "Received";
    public string? ErrorMessage { get; set; }
}

public class AttendanceTransaction : BaseEntity
{
    public Guid? RawTrafficId { get; set; }
    public Guid? UserId { get; set; }
    public string? AttendanceDeviceId { get; set; }
    public DateTime TransactionDateTime { get; set; }
    public string TransactionType { get; set; } = "Auto";
    public string SourceType { get; set; } = string.Empty;
    public bool IsMatchedToUser { get; set; }
    public bool IsIgnored { get; set; }
    public string? IgnoreReason { get; set; }
}

public class AttendancePair : BaseEntity
{
    public Guid UserId { get; set; }
    public DateOnly AttendanceDate { get; set; }
    public Guid? CheckInTransactionId { get; set; }
    public Guid? CheckOutTransactionId { get; set; }
    public DateTime? CheckInTime { get; set; }
    public DateTime? CheckOutTime { get; set; }
    public int? DurationMinutes { get; set; }
    public string PairStatus { get; set; } = "IncompleteOnlyIn";
    public string PairingMethod { get; set; } = "ByAlternatingSequence";
}

public class LeaveRequest : BaseEntity
{
    public Guid UserId { get; set; }
    public string? LeaveTypeId { get; set; }
    public DateTime StartDateTime { get; set; }
    public DateTime EndDateTime { get; set; }
    public int DurationMinutes { get; set; }
    public int? DurationDays { get; set; }
    public string? Reason { get; set; }
    public string Status { get; set; } = "PendingReview";
}

public class MissionRequest : BaseEntity
{
    public Guid UserId { get; set; }
    public string? MissionTypeId { get; set; }
    public DateTime StartDateTime { get; set; }
    public DateTime EndDateTime { get; set; }
    public int DurationMinutes { get; set; }
    public string? LocationText { get; set; }
    public Guid? ProjectId { get; set; }
    public string? Reason { get; set; }
    public string Status { get; set; } = "PendingReview";
}

public class OvertimeRequest : BaseEntity
{
    public Guid UserId { get; set; }
    public DateOnly AttendanceDate { get; set; }
    public DateTime? StartDateTime { get; set; }
    public DateTime? EndDateTime { get; set; }
    public int RequestedMinutes { get; set; }
    public int? ApprovedMinutes { get; set; }
    public string OvertimeType { get; set; } = "PreApproved";
    public string? Reason { get; set; }
    public string Status { get; set; } = "PendingReview";
}

public class AttendanceDailySummary : BaseEntity
{
    public Guid UserId { get; set; }
    public DateOnly AttendanceDate { get; set; }
    public Guid? ShiftId { get; set; }
    public int? RequiredMinutes { get; set; }
    public int? ActualMinutes { get; set; }
    public int? ApprovedWorkMinutes { get; set; }
    public int AbsenceMinutes { get; set; }
    public int LeaveMinutes { get; set; }
    public int MissionMinutes { get; set; }
    public int AuthorizedOvertimeMinutes { get; set; }
    public int DelayMinutes { get; set; }
    public string Status { get; set; } = "Calculated";
}

public class AttendanceMonthlySummary : BaseEntity
{
    public Guid UserId { get; set; }
    public int Year { get; set; }
    public int Month { get; set; }
    public int? TotalRequiredMinutes { get; set; }
    public int? TotalActualMinutes { get; set; }
    public int? TotalApprovedWorkMinutes { get; set; }
    public int TotalAbsenceMinutes { get; set; }
    public int TotalLeaveMinutes { get; set; }
    public int TotalMissionMinutes { get; set; }
    public int TotalAuthorizedOvertimeMinutes { get; set; }
    public string Status { get; set; } = "Calculated";
}