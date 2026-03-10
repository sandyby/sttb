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
            .FirstOrDefaultAsync(n => n.Slug == request.Slug, cancellationToken);

        if (news is null)
            throw new NotFoundException("News", request.Slug);

        return new GetNewsDetailResponse
        {
            Id = news.Id,
            Title = news.Title,
            Slug = news.Slug,
            Content = news.Content,
            ThumbnailUrl = news.ThumbnailUrl,
            Category = news.Category,
            IsPublished = news.IsPublished,
            PublishedAt = news.PublishedAt,
            CreatedAt = news.CreatedAt,
            CreatedBy = news.CreatedBy,
            UpdatedAt = news.UpdatedAt,
            UpdatedBy = news.UpdatedBy
        };
    }
}
