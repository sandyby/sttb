using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sttb.Commons.Services;
using sttb.Contracts.RequestModels.Auth;
using sttb.Contracts.ResponseModels.Auth;
using sttb.Entities;
using sttb.Entities.Models;
using Microsoft.AspNetCore.Identity;

namespace sttb.Commons.RequestHandlers.Auth;

public class RefreshTokenRequestHandler : IRequestHandler<RefreshTokenRequest, RefreshTokenResponse>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;
    private readonly ILogger<RefreshTokenRequestHandler> _logger;

    public RefreshTokenRequestHandler(
        ApplicationDbContext dbContext,
        UserManager<User> userManager,
        ITokenService tokenService,
        ILogger<RefreshTokenRequestHandler> logger)
    {
        _dbContext = dbContext;
        _userManager = userManager;
        _tokenService = tokenService;
        _logger = logger;
    }

    public async Task<RefreshTokenResponse> Handle(RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        var storedToken = await _dbContext.RefreshTokens
            .Include(r => r.User)
            .FirstOrDefaultAsync(r => r.Token == request.RefreshToken, cancellationToken);

        if (storedToken is null || storedToken.IsRevoked || storedToken.ExpiresAt < DateTime.UtcNow)
            throw new UnauthorizedAccessException("Invalid or expired refresh token.");

        // Rotate — revoke old, issue new
        storedToken.IsRevoked = true;

        var user = storedToken.User;
        var roles = await _userManager.GetRolesAsync(user);

        var newAccessToken = _tokenService.GenerateAccessToken(user, roles);
        var newRefreshToken = _tokenService.GenerateRefreshToken(user.Id);

        _dbContext.RefreshTokens.Add(newRefreshToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Refresh token rotated for user {UserId}", user.Id);

        return new RefreshTokenResponse
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken.Token,
            ExpiresIn = 15 * 60
        };
    }
}
