namespace sttb.Contracts.ResponseModels.Auth;

public class LoginResponse
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public int ExpiresIn { get; set; } // seconds
    public string Role { get; set; } = string.Empty;
}
