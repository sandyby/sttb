using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using sttb.Contracts.RequestModels.Events;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.Events;

public class CreateEventRequestHandler : IRequestHandler<CreateEventRequest, Guid>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<CreateEventRequestHandler> _logger;

    public CreateEventRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<CreateEventRequestHandler> logger)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task<Guid> Handle(CreateEventRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        var eventEntity = new Event
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Description = request.Description,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Location = request.Location,
            ImageUrl = request.ImageUrl,
            Category = request.Category,
            RegistrationUrl = request.RegistrationUrl,
            IsPublished = request.IsPublished,
            CreatedBy = userId,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Events.Add(eventEntity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Event {EventId} created by {UserId}", eventEntity.Id, userId);

        return eventEntity.Id;
    }
}
