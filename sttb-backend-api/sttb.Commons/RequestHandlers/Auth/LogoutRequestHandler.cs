using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sttb.Contracts.RequestModels.Auth;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Auth;

public class LogoutRequestHandler : IRequestHandler<LogoutRequest>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly ILogger<LogoutRequestHandler> _logger;

    public LogoutRequestHandler(
        ApplicationDbContext dbContext,
        ILogger<LogoutRequestHandler> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task Handle(LogoutRequest request, CancellationToken cancellationToken)
    {
        var storedToken = await _dbContext.RefreshTokens
            .FirstOrDefaultAsync(r => r.Token == request.RefreshToken, cancellationToken);

        if (storedToken is null || storedToken.IsRevoked)
            return; // Idempotent — silently succeed

        storedToken.IsRevoked = true;
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Refresh token revoked for user {UserId}", storedToken.UserId);
    }
}
