using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sttb.Commons.Services;
using sttb.Contracts.RequestModels.Auth;
using sttb.Contracts.ResponseModels.Auth;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.Auth;

public class LoginRequestHandler : IRequestHandler<LoginRequest, LoginResponse>
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;
    private readonly ApplicationDbContext _dbContext;
    private readonly ILogger<LoginRequestHandler> _logger;

    public LoginRequestHandler(
        UserManager<User> userManager,
        ITokenService tokenService,
        ApplicationDbContext dbContext,
        ILogger<LoginRequestHandler> logger
    )
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task<LoginResponse> Handle(
        LoginRequest request,
        CancellationToken cancellationToken
    )
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is null || !await _userManager.CheckPasswordAsync(user, request.Password))
        {
            _logger.LogWarning("Failed login attempt for email {Email}", request.Email);
            throw new UnauthorizedAccessException("Incorrect username or password!");
        }

        var roles = await _userManager.GetRolesAsync(user);
        var accessToken = _tokenService.GenerateAccessToken(user, roles);
        var refreshToken = _tokenService.GenerateRefreshToken(user.Id);

        _dbContext.RefreshTokens.Add(refreshToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("User {UserId} logged in successfully", user.Id);

        return new LoginResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token,
            ExpiresIn = 15 * 60, // 15 minutes in seconds
            Role = roles.FirstOrDefault() ?? string.Empty,
        };
    }
}
