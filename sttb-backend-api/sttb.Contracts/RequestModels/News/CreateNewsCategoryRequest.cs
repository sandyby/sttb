using MediatR;

namespace sttb.Contracts.RequestModels.News;

public class CreateNewsCategoryRequest : IRequest<Guid>
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
}
