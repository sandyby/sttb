using MediatR;
using sttb.Contracts.ResponseModels.Shared;

namespace sttb.Contracts.RequestModels.Events;

public class GetEventCategoriesRequest : IRequest<List<CategoryResponse>>
{
}
