using MediatR;
using sttb.Contracts.ResponseModels.Pages;

namespace sttb.Contracts.RequestModels.Pages;

public class GetPageRequest : IRequest<GetPageResponse>
{
    public string Slug { get; set; } = string.Empty;
}
