using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using sttb.Commons.Exceptions;
using sttb.Contracts.RequestModels.Events;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Events;

public class UpdateEventRequestHandler : IRequestHandler<UpdateEventRequest>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<UpdateEventRequestHandler> _logger;

    public UpdateEventRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<UpdateEventRequestHandler> logger)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task Handle(UpdateEventRequest request, CancellationToken cancellationToken)
    {
        var eventEntity = await _dbContext.Events.FindAsync([request.Id], cancellationToken);

        if (eventEntity is null)
            throw new NotFoundException("Event", request.Id);

        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        eventEntity.Title = request.Title;
        eventEntity.Description = request.Description;
        eventEntity.StartDate = request.StartDate;
        eventEntity.EndDate = request.EndDate;
        eventEntity.Location = request.Location;
        eventEntity.ImageUrl = request.ImageUrl;
        eventEntity.Category = request.Category;
        eventEntity.RegistrationUrl = request.RegistrationUrl;
        eventEntity.IsPublished = request.IsPublished;
        eventEntity.UpdatedBy = userId;
        eventEntity.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Event {EventId} updated by {UserId}", eventEntity.Id, userId);
    }
}
