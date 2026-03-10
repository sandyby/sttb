using MediatR;
using sttb.Contracts.ResponseModels.News;

namespace sttb.Contracts.RequestModels.News;

public class GetNewsDetailRequest : IRequest<GetNewsDetailResponse>
{
    public string Slug { get; set; } = string.Empty;
}
