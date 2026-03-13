using MediatR;
using sttb.Contracts.ResponseModels.AdmissionWaves;

namespace sttb.Contracts.RequestModels.AdmissionWaves;

public class GetAdmissionWaveListRequest : IRequest<GetAdmissionWaveListResponse>
{
    public bool? IsActive { get; set; }
    public int? Page { get; set; }
    public int? PageSize { get; set; }
}
