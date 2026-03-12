using System.ComponentModel.DataAnnotations;
using sttb.Entities.Interfaces;

namespace sttb.Entities.Models;

public class FoundationMember : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [StringLength(300)]
    public string Name { get; set; } = string.Empty;

    /// <summary>E.g. "Ketua", "Wakil Ketua", "Dewan Pembina"</summary>
    [Required]
    [StringLength(200)]
    public string Position { get; set; } = string.Empty;

    /// <summary>"pembina" | "pengurus" | "anggota"</summary>
    [Required]
    [StringLength(50)]
    public string Category { get; set; } = "pengurus";

    [StringLength(1000)]
    public string? Description { get; set; }

    [StringLength(1000)]
    public string? ImageUrl { get; set; }

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
