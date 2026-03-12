using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Lecturers;
using sttb.Contracts.ResponseModels.Lecturers;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Lecturers;

public class GetLecturerListRequestHandler : IRequestHandler<GetLecturerListRequest, GetLecturerListResponse>
{
    private readonly ApplicationDbContext _dbContext;

    public GetLecturerListRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetLecturerListResponse> Handle(
        GetLecturerListRequest request,
        CancellationToken cancellationToken)
    {
        var query = _dbContext.Lecturers.AsNoTracking();

        if (request.IsActive.HasValue)
            query = query.Where(l => l.IsActive == request.IsActive.Value);

        if (!string.IsNullOrWhiteSpace(request.Rank))
            query = query.Where(l => l.Rank == request.Rank);

        if (!string.IsNullOrWhiteSpace(request.Search))
            query = query.Where(l => l.Name.Contains(request.Search) || l.Specialization.Contains(request.Search));

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderBy(l => l.DisplayOrder)
            .ThenBy(l => l.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(l => new LecturerListItem
            {
                Id = l.Id,
                Name = l.Name,
                Title = l.Title,
                Rank = l.Rank,
                Degree = l.Degree,
                Specialization = l.Specialization,
                ImageUrl = l.ImageUrl,
                Email = l.Email,
                Bio = l.Bio,
                Courses = l.Courses,
                AlmaMater = l.AlmaMater,
                Origin = l.Origin,
                DisplayOrder = l.DisplayOrder,
                IsActive = l.IsActive,
                CreatedAt = l.CreatedAt,
            })
            .ToListAsync(cancellationToken);

        return new GetLecturerListResponse
        {
            Items = items,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize,
        };
    }
}
