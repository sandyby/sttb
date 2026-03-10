using System.ComponentModel.DataAnnotations;
using sttb.Entities.Interfaces;

namespace sttb.Entities.Models;

public class News : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(500)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string Slug { get; set; } = string.Empty;

    public string Content { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? ThumbnailUrl { get; set; }

    [StringLength(100)]
    public string? Category { get; set; }

    public bool IsPublished { get; set; } = false;

    public DateTime? PublishedAt { get; set; }

    [StringLength(450)]
    public string CreatedBy { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    [StringLength(450)]
    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
