using System.ComponentModel.DataAnnotations;
using sttb.Entities.Interfaces;

namespace sttb.Entities.Models;

public class Scholarship : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(300)]
    public string Name { get; set; } = string.Empty;

    /// <summary>E.g. "S1", "S1 - S2"</summary>
    [StringLength(100)]
    public string Level { get; set; } = string.Empty;

    /// <summary>Hex color code for branding, e.g. "#E62129"</summary>
    [StringLength(7)]
    public string Color { get; set; } = "#E62129";

    [StringLength(1000)]
    public string? ImageUrl { get; set; }

    public string Description { get; set; } = string.Empty;

    /// <summary>Stored as JSON array of strings.</summary>
    public List<string> Requirements { get; set; } = new();

    public int DisplayOrder { get; set; } = 0;

    public bool IsActive { get; set; } = true;

    [StringLength(450)]
    public string CreatedBy { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    [StringLength(450)]
    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
