namespace Pishgaman.SBA.Shared.Kernel.ValueObjects;

public class PersonName
{
    public string FirstName { get; }
    public string LastName { get; }
    public string? FatherName { get; }

    public PersonName(string firstName, string lastName, string? fatherName = null)
    {
        FirstName = firstName;
        LastName = lastName;
        FatherName = fatherName;
    }

    public string DisplayName => $"{FirstName} {LastName}";
}