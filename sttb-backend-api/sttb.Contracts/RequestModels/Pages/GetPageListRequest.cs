using MediatR;
using sttb.Contracts.ResponseModels.Pages;

namespace sttb.Contracts.RequestModels.Pages;

public class GetPageListRequest : IRequest<List<GetPageResponse>> { }
