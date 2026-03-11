using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Media;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Media;

public class DeleteMediaCategoryRequestHandler : IRequestHandler<DeleteMediaCategoryRequest>
{
    private readonly ApplicationDbContext _dbContext;

    public DeleteMediaCategoryRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Handle(DeleteMediaCategoryRequest request, CancellationToken cancellationToken)
    {
        var category = await _dbContext.MediaCategories
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (category != null)
        {
            _dbContext.MediaCategories.Remove(category);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
