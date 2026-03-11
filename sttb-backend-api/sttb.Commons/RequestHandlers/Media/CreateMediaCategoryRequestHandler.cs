using MediatR;
using sttb.Contracts.RequestModels.Media;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.Media;

public class CreateMediaCategoryRequestHandler : IRequestHandler<CreateMediaCategoryRequest, Guid>
{
    private readonly ApplicationDbContext _dbContext;

    public CreateMediaCategoryRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Guid> Handle(CreateMediaCategoryRequest request, CancellationToken cancellationToken)
    {
        var category = new MediaCategory
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Slug = request.Slug
        };

        _dbContext.MediaCategories.Add(category);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return category.Id;
    }
}
