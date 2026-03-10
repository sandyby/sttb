using MediatR;
using sttb.Contracts.ResponseModels.Auth;

namespace sttb.Contracts.RequestModels.Auth;

public class RefreshTokenRequest : IRequest<RefreshTokenResponse>
{
    public string RefreshToken { get; set; } = string.Empty;
}
