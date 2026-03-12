namespace sttb.Contracts.RequestModels.AdmissionWaves;

public class AdmissionWaveStepDto
{
    public int StepNumber { get; set; }
    public string Title { get; set; } = string.Empty;
    public DateTime? WhenText { get; set; }
    public string Via { get; set; } = string.Empty;
}
