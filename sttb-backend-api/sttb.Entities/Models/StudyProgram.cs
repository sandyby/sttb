using System.ComponentModel.DataAnnotations;
using sttb.Entities.Interfaces;

namespace sttb.Entities.Models;

public class StudyProgram : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(200)]
    public string Name { get; set; } = string.Empty; // "Sarjana Teologi"

    [StringLength(200)]
    public string Slug { get; set; } = string.Empty; // "sarjana-teologi"

    [StringLength(50)]
    public string Level { get; set; } = string.Empty; // "S1", "S2"

    [StringLength(100)]
    public string Degree { get; set; } = string.Empty; // "S.Th.", "S.Pd.K."

    [StringLength(50)]
    public string Accreditation { get; set; } = string.Empty; // "A", "B", "Unggul"

    [StringLength(500)]
    public string? Tagline { get; set; } = string.Empty; // "Bentuk fondasi teologis yang kokoh"

    public string? Description { get; set; } = string.Empty;

    [StringLength(200)]
    public string Duration { get; set; } = string.Empty; // "4 tahun (8 semester)"

    public int Credits { get; set; } // 148

    public string? Vision { get; set; }
    public string? Mission { get; set; }

    public List<string> Objectives { get; set; } = new();
    public List<string> Courses { get; set; } = new();
    public List<string> Careers { get; set; } = new();
    public List<string> Tags { get; set; } = new();

    [StringLength(1000)]
    public string? CoverImageUrl { get; set; }

    public bool IsPublished { get; set; } = true;

    [StringLength(450)]
    public string CreatedBy { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    [StringLength(450)]
    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
