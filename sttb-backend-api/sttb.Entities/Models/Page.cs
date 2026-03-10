using System.ComponentModel.DataAnnotations;
using sttb.Entities.Interfaces;

namespace sttb.Entities.Models;

public class Page : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(200)]
    public string Slug { get; set; } = string.Empty; // maps to frontend route

    [StringLength(500)]
    public string Title { get; set; } = string.Empty;

    public string Body { get; set; } = string.Empty; // Rich text HTML

    [StringLength(450)]
    public string CreatedBy { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    [StringLength(450)]
    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
