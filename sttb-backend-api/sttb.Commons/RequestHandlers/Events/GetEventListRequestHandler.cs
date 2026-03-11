using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Events;
using sttb.Contracts.ResponseModels.Events;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Events;

public class GetEventListRequestHandler : IRequestHandler<GetEventListRequest, GetEventListResponse>
{
    private readonly ApplicationDbContext _dbContext;

    public GetEventListRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetEventListResponse> Handle(GetEventListRequest request, CancellationToken cancellationToken)
    {
        var query = _dbContext.Events.AsNoTracking()
            .Where(e => e.IsPublished);

        if (!string.IsNullOrWhiteSpace(request.Search))
            query = query.Where(e => e.Title.Contains(request.Search));

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(e => e.StartDate)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(e => new EventListItem
            {
                Id = e.Id,
                Title = e.Title,
                Description = e.Description,
                StartDate = e.StartDate,
                EndDate = e.EndDate,
                Location = e.Location,
                ImageUrl = e.ImageUrl,
                Category = e.Category,
                RegistrationUrl = e.RegistrationUrl,
                IsPublished = e.IsPublished,
                CreatedAt = e.CreatedAt
            })
            .ToListAsync(cancellationToken);

        return new GetEventListResponse
        {
            Items = items,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }
}
