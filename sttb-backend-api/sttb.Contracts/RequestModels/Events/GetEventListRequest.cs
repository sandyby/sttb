using MediatR;
using sttb.Contracts.ResponseModels.Events;

namespace sttb.Contracts.RequestModels.Events;

public class GetEventListRequest : IRequest<GetEventListResponse>
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Search { get; set; }
    public string? Category { get; set; }
}
