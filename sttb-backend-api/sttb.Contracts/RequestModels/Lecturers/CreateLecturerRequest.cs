using MediatR;

namespace sttb.Contracts.RequestModels.Lecturers;

public class CreateLecturerRequest : IRequest<Guid>
{
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Rank { get; set; } = "tetap";
    public string Degree { get; set; } = string.Empty;
    public string Specialization { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string? Email { get; set; }
    public string Bio { get; set; } = string.Empty;
    public List<string> Courses { get; set; } = new();
    public string AlmaMater { get; set; } = string.Empty;
    public string Origin { get; set; } = string.Empty;
    public int DisplayOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;
}
