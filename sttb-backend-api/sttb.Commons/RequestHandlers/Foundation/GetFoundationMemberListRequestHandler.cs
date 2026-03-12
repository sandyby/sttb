using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Foundation;
using sttb.Contracts.ResponseModels.Foundation;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Foundation;

public class GetFoundationMemberListRequestHandler : IRequestHandler<GetFoundationMemberListRequest, GetFoundationMemberListResponse>
{
    private readonly ApplicationDbContext _dbContext;

    public GetFoundationMemberListRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetFoundationMemberListResponse> Handle(GetFoundationMemberListRequest request, CancellationToken cancellationToken)
    {
        var query = _dbContext.FoundationMembers.AsQueryable();

        if (!string.IsNullOrEmpty(request.Category))
        {
            query = query.Where(m => m.Category == request.Category);
        }

        if (request.IsActive.HasValue)
        {
            query = query.Where(m => m.IsActive == request.IsActive.Value);
        }

        if (request.OrderByRecent)
        {
            query = query.OrderByDescending(m => m.CreatedAt);
        }
        else
        {
            query = query.OrderBy(m => m.DisplayOrder).ThenBy(m => m.Name);
        }

        var members = await query
            .Select(m => new FoundationMemberResponse
            {
                Id = m.Id,
                Name = m.Name,
                Position = m.Position,
                Category = m.Category,
                Description = m.Description,
                ImageUrl = m.ImageUrl,
                DisplayOrder = m.DisplayOrder,
                IsActive = m.IsActive
            })
            .ToListAsync(cancellationToken);

        return new GetFoundationMemberListResponse { Members = members };
    }
}
