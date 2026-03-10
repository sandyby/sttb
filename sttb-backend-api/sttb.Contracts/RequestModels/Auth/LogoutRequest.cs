using MediatR;

namespace sttb.Contracts.RequestModels.Auth;

public class LogoutRequest : IRequest
{
    public string RefreshToken { get; set; } = string.Empty;
}
