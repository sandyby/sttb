using System.ComponentModel.DataAnnotations;
using sttb.Entities.Interfaces;

namespace sttb.Entities.Models;

public class Page : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(200)]
    public string Slug { get; set; } = string.Empty; // e.g. "sejarah", "visi-misi"

    [StringLength(500)]
    public string Title { get; set; } = string.Empty;

    [StringLength(200)]
    public string Section { get; set; } = string.Empty; // e.g. "Tentang", "Admisi"

    public string? Content { get; set; } = string.Empty; // Optional Markdown/HTML

    public bool IsPublished { get; set; } = true;

    // SEO Metadata
    [StringLength(500)]
    public string? MetaDescription { get; set; }

    [StringLength(500)]
    public string? MetaKeywords { get; set; }

    [StringLength(450)]
    public string CreatedBy { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    [StringLength(450)]
    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
