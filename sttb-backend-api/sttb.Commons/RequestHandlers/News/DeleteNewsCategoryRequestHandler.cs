using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.News;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.News;

public class DeleteNewsCategoryRequestHandler : IRequestHandler<DeleteNewsCategoryRequest>
{
    private readonly ApplicationDbContext _dbContext;

    public DeleteNewsCategoryRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Handle(DeleteNewsCategoryRequest request, CancellationToken cancellationToken)
    {
        var category = await _dbContext.NewsCategories
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (category != null)
        {
            _dbContext.NewsCategories.Remove(category);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
