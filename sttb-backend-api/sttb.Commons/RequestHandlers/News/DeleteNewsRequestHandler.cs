using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sttb.Commons.Exceptions;
using sttb.Contracts.RequestModels.News;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.News;

public class DeleteNewsRequestHandler : IRequestHandler<DeleteNewsRequest>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<DeleteNewsRequestHandler> _logger;

    public DeleteNewsRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<DeleteNewsRequestHandler> logger
    )
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task Handle(DeleteNewsRequest request, CancellationToken cancellationToken)
    {
        var news = await _dbContext.News.FindAsync([request.Id], cancellationToken);

        if (news is null)
            throw new NotFoundException("News", request.Id);

        var userId =
            _httpContextAccessor
                .HttpContext?.User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
                ?.Value
            ?? string.Empty;

        _dbContext.News.Remove(news);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("News article {NewsId} deleted by {UserId}", request.Id, userId);
    }
}
