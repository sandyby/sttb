using MediatR;
using sttb.Contracts.ResponseModels.AdmissionWaves;

namespace sttb.Contracts.RequestModels.AdmissionWaves;

public class GetAdmissionWaveListRequest : IRequest<GetAdmissionWaveListResponse>
{
    public bool? IsActive { get; set; }
}
