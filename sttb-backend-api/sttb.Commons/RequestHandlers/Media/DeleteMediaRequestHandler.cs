using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using sttb.Commons.Exceptions;
using sttb.Commons.Services;
using sttb.Contracts.RequestModels.Media;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Media;

public class DeleteMediaRequestHandler : IRequestHandler<DeleteMediaRequest>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IFileService _fileService;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<DeleteMediaRequestHandler> _logger;

    public DeleteMediaRequestHandler(
        ApplicationDbContext dbContext,
        IFileService fileService,
        IHttpContextAccessor httpContextAccessor,
        ILogger<DeleteMediaRequestHandler> logger)
    {
        _dbContext = dbContext;
        _fileService = fileService;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task Handle(DeleteMediaRequest request, CancellationToken cancellationToken)
    {
        var media = await _dbContext.Media.FindAsync([request.Id], cancellationToken);

        if (media is null)
            throw new NotFoundException("Media", request.Id);

        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        _fileService.Delete(media.Url);
        _dbContext.Media.Remove(media);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Media item {MediaId} deleted by {UserId}", request.Id, userId);
    }
}
