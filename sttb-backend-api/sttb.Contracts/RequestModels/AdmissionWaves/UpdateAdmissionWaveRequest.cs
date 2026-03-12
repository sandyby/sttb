using MediatR;

namespace sttb.Contracts.RequestModels.AdmissionWaves;

public class UpdateAdmissionWaveRequest : IRequest
{
    public Guid Id { get; set; }
    public string WaveNumber { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Deadline { get; set; } = string.Empty;
    public string Status { get; set; } = "upcoming";
    public string Color { get; set; } = "#0A2C74";
    public DateTime? PsikotesSchedule { get; set; }
    public DateTime? TertulisSchedule { get; set; }
    public DateTime? WawancaraSchedule { get; set; }
    public List<AdmissionWaveStepDto> Steps { get; set; } = new();
    public int DisplayOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;
}
