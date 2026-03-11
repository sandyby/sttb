using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Events;
using sttb.Contracts.ResponseModels.Shared;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Events;

public class GetEventCategoriesRequestHandler : IRequestHandler<GetEventCategoriesRequest, List<CategoryResponse>>
{
    private readonly ApplicationDbContext _dbContext;

    public GetEventCategoriesRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<CategoryResponse>> Handle(GetEventCategoriesRequest request, CancellationToken cancellationToken)
    {
        return await _dbContext.EventCategories
            .AsNoTracking()
            .OrderBy(c => c.Name)
            .Select(c => new CategoryResponse
            {
                Id = c.Id,
                Name = c.Name,
                Slug = c.Slug
            })
            .ToListAsync(cancellationToken);
    }
}
