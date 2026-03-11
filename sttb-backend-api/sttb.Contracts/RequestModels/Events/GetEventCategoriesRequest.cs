using MediatR;

namespace sttb.Contracts.RequestModels.Events;

public class GetEventCategoriesRequest : IRequest<List<string>>
{
}
