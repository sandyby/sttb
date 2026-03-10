using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sttb.Commons.Exceptions;
using sttb.Contracts.RequestModels.Pages;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Pages;

public class UpdatePageRequestHandler : IRequestHandler<UpdatePageRequest>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<UpdatePageRequestHandler> _logger;

    public UpdatePageRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<UpdatePageRequestHandler> logger)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task Handle(UpdatePageRequest request, CancellationToken cancellationToken)
    {
        var page = await _dbContext.Pages
            .FirstOrDefaultAsync(p => p.Slug == request.Slug, cancellationToken);

        if (page is null)
            throw new NotFoundException("Page", request.Slug);

        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        page.Title = request.Title;
        page.Body = request.Body;
        page.UpdatedBy = userId;
        page.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Page {Slug} updated by {UserId}", request.Slug, userId);
    }
}
