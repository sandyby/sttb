using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Pages;
using sttb.Contracts.ResponseModels.Pages;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Pages;

public class GetPageListRequestHandler : IRequestHandler<GetPageListRequest, List<GetPageResponse>>
{
    private readonly ApplicationDbContext _dbContext;

    public GetPageListRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<GetPageResponse>> Handle(GetPageListRequest request, CancellationToken cancellationToken)
    {
        return await _dbContext.Pages
            .AsNoTracking()
            .OrderBy(p => p.Section)
            .ThenBy(p => p.Title)
            .Select(page => new GetPageResponse
            {
                Id = page.Id,
                Slug = page.Slug,
                Title = page.Title,
                Section = page.Section,
                Content = page.Content,
                IsPublished = page.IsPublished,
                MetaDescription = page.MetaDescription,
                MetaKeywords = page.MetaKeywords,
                UpdatedAt = page.UpdatedAt,
                UpdatedBy = page.UpdatedBy
            })
            .ToListAsync(cancellationToken);
    }
}
