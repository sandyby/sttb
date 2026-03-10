using MediatR;
using sttb.Contracts.ResponseModels.News;

namespace sttb.Contracts.RequestModels.News;

public class GetNewsListRequest : IRequest<GetNewsListResponse>
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? Category { get; set; }
    public string? Search { get; set; }
    public bool? IsPublished { get; set; }
}
