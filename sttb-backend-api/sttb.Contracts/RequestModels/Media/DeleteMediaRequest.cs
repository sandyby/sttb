using MediatR;

namespace sttb.Contracts.RequestModels.Media;

public class DeleteMediaRequest : IRequest
{
    public Guid Id { get; set; }
}
