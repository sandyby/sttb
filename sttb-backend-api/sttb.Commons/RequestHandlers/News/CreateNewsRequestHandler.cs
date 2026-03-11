using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using sttb.Contracts.RequestModels.News;
using sttb.Entities;
using NewsEntity = sttb.Entities.Models.News;

namespace sttb.Commons.RequestHandlers.News;

public class CreateNewsRequestHandler : IRequestHandler<CreateNewsRequest, Guid>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<CreateNewsRequestHandler> _logger;

    public CreateNewsRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<CreateNewsRequestHandler> logger)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task<Guid> Handle(CreateNewsRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        var news = new NewsEntity
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Slug = request.Slug,
            Content = request.Content,
            Excerpt = request.Excerpt,
            ThumbnailUrl = request.ThumbnailUrl,
            CategoryId = request.CategoryId,
            IsFeatured = request.IsFeatured,
            IsPublished = request.IsPublished,
            PublishedAt = request.IsPublished ? DateTime.UtcNow : null,
            CreatedBy = userId,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.News.Add(news);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("News article {NewsId} created by {UserId}", news.Id, userId);

        return news.Id;
    }
}
