using sttb.Entities.Models;

namespace sttb.Commons.Services;

public interface ITokenService
{
    string GenerateAccessToken(User user, IList<string> roles);
    RefreshToken GenerateRefreshToken(string userId);
}
