using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Commons.Exceptions;
using sttb.Contracts.RequestModels.News;
using sttb.Contracts.ResponseModels.News;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.News;

public class GetNewsDetailRequestHandler : IRequestHandler<GetNewsDetailRequest, GetNewsDetailResponse>
{
    private readonly ApplicationDbContext _dbContext;

    public GetNewsDetailRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetNewsDetailResponse> Handle(GetNewsDetailRequest request, CancellationToken cancellationToken)
    {
        var news = await _dbContext.News
            .AsNoTracking()
            .Where(n => n.Slug == request.Slug)
            .Select(n => new GetNewsDetailResponse
            {
                Id = n.Id,
                Title = n.Title,
                Slug = n.Slug,
                Content = n.Content,
                Excerpt = n.Excerpt,
                ThumbnailUrl = n.ThumbnailUrl,
                Category = n.Category != null ? n.Category.Name : null,
                IsFeatured = n.IsFeatured,
                IsPublished = n.IsPublished,
                PublishedAt = n.PublishedAt,
                CreatedAt = n.CreatedAt,
                CreatedBy = n.CreatedBy,
                UpdatedAt = n.UpdatedAt,
                UpdatedBy = n.UpdatedBy
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (news is null)
            throw new NotFoundException("News", request.Slug);

        return news;
    }
}
