using MediatR;

namespace sttb.Contracts.RequestModels.Media;

public class DeleteMediaCategoryRequest : IRequest
{
    public Guid Id { get; set; }
}
