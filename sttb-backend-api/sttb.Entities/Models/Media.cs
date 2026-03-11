using System.ComponentModel.DataAnnotations;
using sttb.Entities.Interfaces;

namespace sttb.Entities.Models;

public class Media : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(500)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string Url { get; set; } = string.Empty;

    [StringLength(20)]
    public string Type { get; set; } = string.Empty; // "video" | "article" | "image"

    [StringLength(1000)]
    public string? ThumbnailUrl { get; set; }

    public Guid? CategoryId { get; set; }
    public MediaCategory? Category { get; set; }

    [StringLength(100)]
    public string? Tag { get; set; }

    [StringLength(450)]
    public string CreatedBy { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    [StringLength(450)]
    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
