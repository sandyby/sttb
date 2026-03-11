using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.News;
using sttb.Contracts.ResponseModels.News;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.News;

public class GetNewsListRequestHandler : IRequestHandler<GetNewsListRequest, GetNewsListResponse>
{
    private readonly ApplicationDbContext _dbContext;

    public GetNewsListRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetNewsListResponse> Handle(GetNewsListRequest request, CancellationToken cancellationToken)
    {
        var query = _dbContext.News.AsNoTracking();

        if (request.IsPublished.HasValue)
            query = query.Where(n => n.IsPublished == request.IsPublished.Value);

        if (!string.IsNullOrWhiteSpace(request.Category))
            query = query.Where(n => n.Category != null && n.Category.Name == request.Category);

        if (!string.IsNullOrWhiteSpace(request.Search))
            query = query.Where(n => n.Title.Contains(request.Search));

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(n => n.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(n => new NewsListItem
            {
                Id = n.Id,
                Title = n.Title,
                Slug = n.Slug,
                Excerpt = n.Excerpt,
                ThumbnailUrl = n.ThumbnailUrl,
                Category = n.Category != null ? n.Category.Name : null,
                IsFeatured = n.IsFeatured,
                IsPublished = n.IsPublished,
                PublishedAt = n.PublishedAt,
                CreatedAt = n.CreatedAt
            })
            .ToListAsync(cancellationToken);

        return new GetNewsListResponse
        {
            Items = items,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }
}
