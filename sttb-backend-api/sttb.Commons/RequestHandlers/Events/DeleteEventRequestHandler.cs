using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using sttb.Commons.Exceptions;
using sttb.Contracts.RequestModels.Events;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Events;

public class DeleteEventRequestHandler : IRequestHandler<DeleteEventRequest>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<DeleteEventRequestHandler> _logger;

    public DeleteEventRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<DeleteEventRequestHandler> logger)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task Handle(DeleteEventRequest request, CancellationToken cancellationToken)
    {
        var eventEntity = await _dbContext.Events.FindAsync([request.Id], cancellationToken);

        if (eventEntity is null)
            throw new NotFoundException("Event", request.Id);

        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        _dbContext.Events.Remove(eventEntity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Event {EventId} deleted by {UserId}", request.Id, userId);
    }
}
