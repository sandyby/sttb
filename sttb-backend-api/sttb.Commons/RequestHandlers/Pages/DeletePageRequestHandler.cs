using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Commons.Exceptions;
using sttb.Contracts.RequestModels.Pages;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Pages;

public class DeletePageRequestHandler : IRequestHandler<DeletePageRequest>
{
    private readonly ApplicationDbContext _dbContext;

    public DeletePageRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Handle(DeletePageRequest request, CancellationToken cancellationToken)
    {
        var page = await _dbContext.Pages
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (page is null)
            throw new NotFoundException("Page", request.Id.ToString());

        _dbContext.Pages.Remove(page);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
