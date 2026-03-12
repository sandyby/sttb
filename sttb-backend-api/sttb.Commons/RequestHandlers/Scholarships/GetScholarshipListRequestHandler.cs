using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Scholarships;
using sttb.Contracts.ResponseModels.Scholarships;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Scholarships;

public class GetScholarshipListRequestHandler : IRequestHandler<GetScholarshipListRequest, GetScholarshipListResponse>
{
    private readonly ApplicationDbContext _context;

    public GetScholarshipListRequestHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<GetScholarshipListResponse> Handle(GetScholarshipListRequest request, CancellationToken cancellationToken)
    {
        var query = _context.Scholarships.AsNoTracking();

        if (request.IsActive.HasValue)
        {
            query = query.Where(s => s.IsActive == request.IsActive.Value);
        }

        var scholarships = await query
            .OrderBy(s => s.DisplayOrder)
            .ToListAsync(cancellationToken);

        var items = scholarships.Select(s => new ScholarshipListItem
        {
            Id = s.Id,
            Name = s.Name,
            Level = s.Level,
            Color = s.Color,
            ImageUrl = s.ImageUrl,
            Description = s.Description,
            Requirements = s.Requirements,
            DisplayOrder = s.DisplayOrder,
            IsActive = s.IsActive
        }).ToList();

        return new GetScholarshipListResponse { Items = items };
    }
}
