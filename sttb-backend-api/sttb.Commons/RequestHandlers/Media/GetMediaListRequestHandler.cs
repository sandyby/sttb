using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Media;
using sttb.Contracts.ResponseModels.Media;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Media;

public class GetMediaListRequestHandler : IRequestHandler<GetMediaListRequest, GetMediaListResponse>
{
    private readonly ApplicationDbContext _dbContext;

    public GetMediaListRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetMediaListResponse> Handle(GetMediaListRequest request, CancellationToken cancellationToken)
    {
        var query = _dbContext.Media.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(request.Type))
            query = query.Where(m => m.Type == request.Type);

        if (!string.IsNullOrWhiteSpace(request.Category))
            query = query.Where(m => m.Category == request.Category);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(m => m.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(m => new MediaListItem
            {
                Id = m.Id,
                Title = m.Title,
                Url = m.Url,
                Type = m.Type,
                ThumbnailUrl = m.ThumbnailUrl,
                Category = m.Category,
                Tag = m.Tag,
                CreatedAt = m.CreatedAt
            })
            .ToListAsync(cancellationToken);

        return new GetMediaListResponse
        {
            Items = items,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }
}
