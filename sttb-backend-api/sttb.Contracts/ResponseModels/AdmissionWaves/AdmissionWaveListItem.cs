using sttb.Contracts.RequestModels.AdmissionWaves;

namespace sttb.Contracts.ResponseModels.AdmissionWaves;

public class AdmissionWaveListItem
{
    public Guid Id { get; set; }
    public string WaveNumber { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Deadline { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public DateTime? PsikotesSchedule { get; set; }
    public DateTime? TertulisSchedule { get; set; }
    public DateTime? WawancaraSchedule { get; set; }
    public List<AdmissionWaveStepDto> Steps { get; set; } = new();
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}
