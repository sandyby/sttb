using MediatR;
using sttb.Contracts.ResponseModels.Shared;

namespace sttb.Contracts.RequestModels.News;

public class GetNewsCategoriesRequest : IRequest<List<CategoryResponse>>
{
}
