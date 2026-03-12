namespace sttb.Entities.Models;

/// <summary>
/// A single admission activity step within a wave. Stored as JSON inside AdmissionWave.Steps.
/// </summary>
public class AdmissionWaveStepItem
{
    public int StepNumber { get; set; }
    public string Title { get; set; } = string.Empty;

    /// <summary>Optional date/time of this activity step.</summary>
    public DateTime? WhenText { get; set; }

    /// <summary>Delivery method, e.g. "Via Zoom", "Onsite"</summary>
    public string Via { get; set; } = string.Empty;
}
