using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Media;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Media;

public class GetMediaCategoriesRequestHandler : IRequestHandler<GetMediaCategoriesRequest, List<string>>
{
    private readonly ApplicationDbContext _dbContext;

    public GetMediaCategoriesRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<string>> Handle(GetMediaCategoriesRequest request, CancellationToken cancellationToken)
    {
        return await _dbContext.Media
            .AsNoTracking()
            .Where(m => m.Category != null)
            .Select(m => m.Category!)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync(cancellationToken);
    }
}
