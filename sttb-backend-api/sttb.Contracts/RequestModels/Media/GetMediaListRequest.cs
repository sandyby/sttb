using MediatR;
using sttb.Contracts.ResponseModels.Media;

namespace sttb.Contracts.RequestModels.Media;

public class GetMediaListRequest : IRequest<GetMediaListResponse>
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
    public string? Type { get; set; } // "video" | "article"
    public string? Category { get; set; }
    public string? Search { get; set; }
}
