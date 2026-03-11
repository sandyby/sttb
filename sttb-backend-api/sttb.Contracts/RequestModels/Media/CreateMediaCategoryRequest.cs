using MediatR;

namespace sttb.Contracts.RequestModels.Media;

public class CreateMediaCategoryRequest : IRequest<Guid>
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
}
