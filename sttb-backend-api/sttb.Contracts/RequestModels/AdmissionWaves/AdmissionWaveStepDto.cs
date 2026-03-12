namespace sttb.Contracts.RequestModels.AdmissionWaves;

public class AdmissionWaveStepDto
{
    public int StepNumber { get; set; }
    public string Title { get; set; } = string.Empty;
    public string WhenText { get; set; } = string.Empty;
    public string Via { get; set; } = string.Empty;
}
