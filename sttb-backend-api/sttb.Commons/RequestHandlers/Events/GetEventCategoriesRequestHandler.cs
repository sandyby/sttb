using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Events;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Events;

public class GetEventCategoriesRequestHandler : IRequestHandler<GetEventCategoriesRequest, List<string>>
{
    private readonly ApplicationDbContext _dbContext;

    public GetEventCategoriesRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<string>> Handle(GetEventCategoriesRequest request, CancellationToken cancellationToken)
    {
        return await _dbContext.Events
            .AsNoTracking()
            .Where(e => e.IsPublished && e.Category != null)
            .Select(e => e.Category!)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync(cancellationToken);
    }
}
