using System.ComponentModel.DataAnnotations;
using sttb.Entities.Interfaces;

namespace sttb.Entities.Models;

public class Event : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(500)]
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public bool IsOngoing { get; set; } = false;

    [StringLength(500)]
    public string Location { get; set; } = string.Empty;

    [StringLength(500)]
    public string? LocationDetails { get; set; }

    [StringLength(1000)]
    public string? ImageUrl { get; set; }

    public Guid? CategoryId { get; set; }
    public EventCategory? Category { get; set; }

    [StringLength(1000)]
    public string? RegistrationUrl { get; set; }

    public bool IsRegistrationOpen { get; set; } = true;

    public DateTime? RegistrationDeadline { get; set; }

    [StringLength(100)]
    public string? MaxParticipants { get; set; }

    [StringLength(50)]
    public string Mode { get; set; } = "offline";

    public bool IsOnline { get; set; } = false;

    [StringLength(1000)]
    public string? StreamingUrl { get; set; }

    [StringLength(300)]
    public string? Organizer { get; set; }

    [StringLength(300)]
    public string? ContactEmail { get; set; }

    public List<string> Tags { get; set; } = new();

    public bool IsPublished { get; set; } = false;

    [StringLength(450)]
    public string CreatedBy { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    [StringLength(450)]
    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
