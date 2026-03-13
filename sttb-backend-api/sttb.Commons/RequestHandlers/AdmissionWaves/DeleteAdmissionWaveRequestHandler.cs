using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sttb.Contracts.RequestModels.AdmissionWaves;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.AdmissionWaves;

public class DeleteAdmissionWaveRequestHandler : IRequestHandler<DeleteAdmissionWaveRequest>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly ILogger<DeleteAdmissionWaveRequestHandler> _logger;

    public DeleteAdmissionWaveRequestHandler(
        ApplicationDbContext dbContext,
        ILogger<DeleteAdmissionWaveRequestHandler> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task Handle(DeleteAdmissionWaveRequest request, CancellationToken cancellationToken)
    {
        var wave = await _dbContext.AdmissionWaves
            .FirstOrDefaultAsync(w => w.Id == request.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"AdmissionWave {request.Id} not found.");

        _dbContext.AdmissionWaves.Remove(wave);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("AdmissionWave {WaveId} deleted", request.Id);
    }
}
