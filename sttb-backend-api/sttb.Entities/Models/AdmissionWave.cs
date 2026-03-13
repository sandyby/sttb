using System.ComponentModel.DataAnnotations;
using sttb.Entities.Interfaces;

namespace sttb.Entities.Models;

public class AdmissionWave : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    /// <summary>Display identifier, e.g. "I", "II", "III"</summary>
    [StringLength(20)]
    public string WaveNumber { get; set; } = string.Empty;

    /// <summary>Display label, e.g. "Gelombang I"</summary>
    [StringLength(100)]
    public string Label { get; set; } = string.Empty;

    /// <summary>Deadline for registration</summary>
    public DateTime? Deadline { get; set; }

    /// <summary>"open" | "closed" | "upcoming"</summary>
    [StringLength(20)]
    public string Status { get; set; } = "upcoming";

    /// <summary>Hex color for UI accent, e.g. "#E62129"</summary>
    [StringLength(20)]
    public string Color { get; set; } = "#0A2C74";

    public DateTime? PsikotesSchedule { get; set; }

    public DateTime? TertulisSchedule { get; set; }

    public DateTime? WawancaraSchedule { get; set; }

    /// <summary>Ordered list of admission activities, stored as JSON.</summary>
    public List<AdmissionWaveStepItem> Steps { get; set; } = new();

    public int DisplayOrder { get; set; } = 0;

    public bool IsActive { get; set; } = true;

    [StringLength(450)]
    public string CreatedBy { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    [StringLength(450)]
    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
