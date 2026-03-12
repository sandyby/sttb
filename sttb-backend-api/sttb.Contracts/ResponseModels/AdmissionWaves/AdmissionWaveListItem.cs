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
    public string PsikotesSchedule { get; set; } = string.Empty;
    public string TertulisSchedule { get; set; } = string.Empty;
    public string WawancaraSchedule { get; set; } = string.Empty;
    public List<AdmissionWaveStepDto> Steps { get; set; } = new();
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}
