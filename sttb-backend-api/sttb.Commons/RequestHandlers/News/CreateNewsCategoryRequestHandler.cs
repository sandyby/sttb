using MediatR;
using sttb.Contracts.RequestModels.News;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.News;

public class CreateNewsCategoryRequestHandler : IRequestHandler<CreateNewsCategoryRequest, Guid>
{
    private readonly ApplicationDbContext _dbContext;

    public CreateNewsCategoryRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Guid> Handle(CreateNewsCategoryRequest request, CancellationToken cancellationToken)
    {
        var category = new NewsCategory
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Slug = request.Slug
        };

        _dbContext.NewsCategories.Add(category);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return category.Id;
    }
}
