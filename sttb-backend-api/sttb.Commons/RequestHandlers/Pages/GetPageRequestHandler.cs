using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Commons.Exceptions;
using sttb.Contracts.RequestModels.Pages;
using sttb.Contracts.ResponseModels.Pages;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Pages;

public class GetPageRequestHandler : IRequestHandler<GetPageRequest, GetPageResponse>
{
    private readonly ApplicationDbContext _dbContext;

    public GetPageRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetPageResponse> Handle(GetPageRequest request, CancellationToken cancellationToken)
    {
        var page = await _dbContext.Pages
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Slug == request.Slug, cancellationToken);

        if (page is null)
            throw new NotFoundException("Page", request.Slug);

        return new GetPageResponse
        {
            Id = page.Id,
            Slug = page.Slug,
            Title = page.Title,
            Body = page.Body,
            UpdatedAt = page.UpdatedAt,
            UpdatedBy = page.UpdatedBy
        };
    }
}
