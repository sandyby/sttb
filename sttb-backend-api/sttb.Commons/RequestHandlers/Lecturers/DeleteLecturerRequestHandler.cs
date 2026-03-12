using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sttb.Contracts.RequestModels.Lecturers;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Lecturers;

public class DeleteLecturerRequestHandler : IRequestHandler<DeleteLecturerRequest>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly ILogger<DeleteLecturerRequestHandler> _logger;

    public DeleteLecturerRequestHandler(
        ApplicationDbContext dbContext,
        ILogger<DeleteLecturerRequestHandler> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task Handle(DeleteLecturerRequest request, CancellationToken cancellationToken)
    {
        var lecturer = await _dbContext.Lecturers.FirstOrDefaultAsync(l => l.Id == request.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"Lecturer {request.Id} not found.");

        _dbContext.Lecturers.Remove(lecturer);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Lecturer {LecturerId} deleted", request.Id);
    }
}
