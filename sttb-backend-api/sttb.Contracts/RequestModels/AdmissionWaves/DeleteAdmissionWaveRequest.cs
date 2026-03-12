using MediatR;

namespace sttb.Contracts.RequestModels.AdmissionWaves;

public class DeleteAdmissionWaveRequest : IRequest
{
    public Guid Id { get; set; }
}
