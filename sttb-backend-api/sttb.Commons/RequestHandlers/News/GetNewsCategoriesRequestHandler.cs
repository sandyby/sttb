using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.News;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.News;

public class GetNewsCategoriesRequestHandler : IRequestHandler<GetNewsCategoriesRequest, List<string>>
{
    private readonly ApplicationDbContext _dbContext;

    public GetNewsCategoriesRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<string>> Handle(GetNewsCategoriesRequest request, CancellationToken cancellationToken)
    {
        return await _dbContext.News
            .AsNoTracking()
            .Where(n => n.IsPublished && n.Category != null)
            .Select(n => n.Category!)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync(cancellationToken);
    }
}
