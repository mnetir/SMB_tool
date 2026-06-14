namespace Pishgaman.SBA.Shared.Kernel;

public interface IAuditable
{
    string? CreatedByUserId { get; set; }
    string? UpdatedByUserId { get; set; }
}