using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using sttb.Contracts.RequestModels.Pages;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.Pages;

public class CreatePageRequestHandler : IRequestHandler<CreatePageRequest, Guid>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<CreatePageRequestHandler> _logger;

    public CreatePageRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<CreatePageRequestHandler> logger)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task<Guid> Handle(CreatePageRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        var page = new Page
        {
            Id = Guid.NewGuid(),
            Slug = request.Slug,
            Title = request.Title,
            Section = request.Section,
            Content = request.Content,
            IsPublished = request.IsPublished,
            MetaDescription = request.MetaDescription,
            MetaKeywords = request.MetaKeywords,
            CreatedBy = userId,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Pages.Add(page);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Page {Slug} created by {UserId}", request.Slug, userId);

        return page.Id;
    }
}
