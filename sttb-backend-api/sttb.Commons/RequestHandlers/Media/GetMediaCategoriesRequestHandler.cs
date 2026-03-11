using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Media;
using sttb.Contracts.ResponseModels.Shared;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Media;

public class GetMediaCategoriesRequestHandler : IRequestHandler<GetMediaCategoriesRequest, List<CategoryResponse>>
{
    private readonly ApplicationDbContext _dbContext;

    public GetMediaCategoriesRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<CategoryResponse>> Handle(GetMediaCategoriesRequest request, CancellationToken cancellationToken)
    {
        return await _dbContext.MediaCategories
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
