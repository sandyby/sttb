using MediatR;

namespace sttb.Contracts.RequestModels.AdmissionWaves;

public class CreateAdmissionWaveRequest : IRequest<Guid>
{
    public string WaveNumber { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public DateTime? Deadline { get; set; }
    public string Status { get; set; } = "upcoming";
    public string Color { get; set; } = "#0A2C74";
    public DateTime? PsikotesSchedule { get; set; }
    public DateTime? TertulisSchedule { get; set; }
    public DateTime? WawancaraSchedule { get; set; }
    public List<AdmissionWaveStepDto> Steps { get; set; } = new();
    public int DisplayOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;
}
