using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Events;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Events;

public class DeleteEventCategoryRequestHandler : IRequestHandler<DeleteEventCategoryRequest>
{
    private readonly ApplicationDbContext _dbContext;

    public DeleteEventCategoryRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Handle(DeleteEventCategoryRequest request, CancellationToken cancellationToken)
    {
        var category = await _dbContext.EventCategories
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (category != null)
        {
            _dbContext.EventCategories.Remove(category);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
