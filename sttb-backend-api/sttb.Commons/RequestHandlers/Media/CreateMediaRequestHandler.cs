using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using sttb.Contracts.RequestModels.Media;
using sttb.Entities;
using MediaEntity = sttb.Entities.Models.Media;

namespace sttb.Commons.RequestHandlers.Media;

public class CreateMediaRequestHandler : IRequestHandler<CreateMediaRequest, Guid>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<CreateMediaRequestHandler> _logger;

    public CreateMediaRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<CreateMediaRequestHandler> logger)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task<Guid> Handle(CreateMediaRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        var media = new MediaEntity
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Url = request.Url,
            Type = request.Type,
            ThumbnailUrl = request.ThumbnailUrl,
            Category = request.Category,
            Tag = request.Tag,
            CreatedBy = userId,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Media.Add(media);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Media item {MediaId} created by {UserId}", media.Id, userId);

        return media.Id;
    }
}
