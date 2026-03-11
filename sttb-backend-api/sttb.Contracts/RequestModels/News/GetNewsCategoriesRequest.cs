using MediatR;

namespace sttb.Contracts.RequestModels.News;

public class GetNewsCategoriesRequest : IRequest<List<string>>
{
}
