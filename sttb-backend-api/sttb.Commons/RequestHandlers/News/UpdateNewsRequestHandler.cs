using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sttb.Commons.Exceptions;
using sttb.Contracts.RequestModels.News;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.News;

public class UpdateNewsRequestHandler : IRequestHandler<UpdateNewsRequest>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<UpdateNewsRequestHandler> _logger;

    public UpdateNewsRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<UpdateNewsRequestHandler> logger
    )
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task Handle(UpdateNewsRequest request, CancellationToken cancellationToken)
    {
        var news = await _dbContext.News.FindAsync([request.Id], cancellationToken);

        if (news is null)
            throw new NotFoundException("News", request.Id);

        var userId =
            _httpContextAccessor
                .HttpContext?.User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
                ?.Value
            ?? string.Empty;

        news.Title = request.Title;
        news.Slug = request.Slug;
        news.Content = request.Content;
        news.Excerpt = request.Excerpt;
        news.ThumbnailUrl = request.ThumbnailUrl;
        news.CategoryId = request.CategoryId;
        news.Author = request.Author;
        news.Tags = request.Tags;
        news.IsFeatured = request.IsFeatured;

        if (request.IsPublished && !news.IsPublished)
            news.PublishedAt = DateTime.UtcNow;

        news.IsPublished = request.IsPublished;
        news.UpdatedBy = userId;
        news.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("News article {NewsId} updated by {UserId}", news.Id, userId);
    }
}
