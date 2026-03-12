using System.ComponentModel.DataAnnotations;
using sttb.Entities.Interfaces;

namespace sttb.Entities.Models;

public class Lecturer : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(300)]
    public string Name { get; set; } = string.Empty;

    /// <summary>E.g. "Ketua STTB", "Dosen Tetap", "Dosen Tidak Tetap"</summary>
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    /// <summary>"pimpinan" | "tetap" | "tidak-tetap"</summary>
    [StringLength(50)]
    public string Rank { get; set; } = "tetap";

    [StringLength(500)]
    public string Degree { get; set; } = string.Empty;

    [StringLength(300)]
    public string Specialization { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? ImageUrl { get; set; }

    [StringLength(300)]
    public string? Email { get; set; }

    public string Bio { get; set; } = string.Empty;

    /// <summary>Stored as JSON array of strings.</summary>
    public List<string> Courses { get; set; } = new();

    [StringLength(500)]
    public string AlmaMater { get; set; } = string.Empty;

    [StringLength(300)]
    public string Origin { get; set; } = string.Empty;

    /// <summary>Controls display order (ascending). Lower number = shown first.</summary>
    public int DisplayOrder { get; set; } = 0;

    public bool IsActive { get; set; } = true;

    [StringLength(450)]
    public string CreatedBy { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    [StringLength(450)]
    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
