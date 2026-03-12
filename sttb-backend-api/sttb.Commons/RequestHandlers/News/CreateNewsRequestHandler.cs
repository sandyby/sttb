using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sttb.Commons.Exceptions;
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
        ILogger<CreateNewsRequestHandler> logger
    )
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task<Guid> Handle(CreateNewsRequest request, CancellationToken cancellationToken)
    {
        var userId =
            _httpContextAccessor
                .HttpContext?.User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
                ?.Value
            ?? string.Empty;

        var slugExists = await _dbContext.News.AnyAsync(
            n => n.Slug == request.Slug,
            cancellationToken
        );

        if (slugExists)
        {
            throw new ValidationException("A news with this slug already exists!");
        }

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
            CreatedAt = DateTime.UtcNow,
        };

        _dbContext.News.Add(news);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("News article {NewsId} created by {UserId}", news.Id, userId);

        return news.Id;
    }
}
