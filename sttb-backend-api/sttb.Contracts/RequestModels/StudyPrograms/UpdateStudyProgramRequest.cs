using MediatR;

namespace sttb.Contracts.RequestModels.StudyPrograms;

public class UpdateStudyProgramRequest : IRequest
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public string Accreditation { get; set; } = string.Empty;
    public string? Tagline { get; set; }
    public string? Description { get; set; }
    public string Duration { get; set; } = string.Empty;
    public int Credits { get; set; }
    public string? Vision { get; set; }
    public string? Mission { get; set; }
    public List<string> Objectives { get; set; } = new();
    public List<string> Courses { get; set; } = new();
    public List<string> Careers { get; set; } = new();
    public List<string> Tags { get; set; } = new();
    public string? CoverImageUrl { get; set; }
    public bool IsPublished { get; set; } = true;
}
