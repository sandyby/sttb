using MediatR;
using sttb.Contracts.RequestModels.Events;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.Events;

public class CreateEventCategoryRequestHandler : IRequestHandler<CreateEventCategoryRequest, Guid>
{
    private readonly ApplicationDbContext _dbContext;

    public CreateEventCategoryRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Guid> Handle(CreateEventCategoryRequest request, CancellationToken cancellationToken)
    {
        var category = new EventCategory
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Slug = request.Slug
        };

        _dbContext.EventCategories.Add(category);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return category.Id;
    }
}
