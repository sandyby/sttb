using MediatR;

namespace sttb.Contracts.RequestModels.Pages;

public class UpdatePageRequest : IRequest
{
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
}
