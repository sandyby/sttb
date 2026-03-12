using MediatR;
using sttb.Contracts.ResponseModels.Foundation;

namespace sttb.Contracts.RequestModels.Foundation;

public class GetFoundationMemberListRequest : IRequest<GetFoundationMemberListResponse>
{
    public string? Category { get; set; }
    public bool? IsActive { get; set; }
    public bool OrderByRecent { get; set; } = false;
    public int? Page { get; set; }
    public int? PageSize { get; set; }
}
