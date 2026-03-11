using MediatR;

namespace sttb.Contracts.RequestModels.Media;

public class GetMediaCategoriesRequest : IRequest<List<string>>
{
}
