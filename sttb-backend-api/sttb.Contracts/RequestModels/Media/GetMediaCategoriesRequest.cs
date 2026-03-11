using MediatR;
using sttb.Contracts.ResponseModels.Shared;

namespace sttb.Contracts.RequestModels.Media;

public class GetMediaCategoriesRequest : IRequest<List<CategoryResponse>>
{
}
