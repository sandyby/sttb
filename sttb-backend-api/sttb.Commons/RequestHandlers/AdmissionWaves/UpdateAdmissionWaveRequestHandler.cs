using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sttb.Contracts.RequestModels.AdmissionWaves;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.AdmissionWaves;

public class UpdateAdmissionWaveRequestHandler : IRequestHandler<UpdateAdmissionWaveRequest>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<UpdateAdmissionWaveRequestHandler> _logger;

    public UpdateAdmissionWaveRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<UpdateAdmissionWaveRequestHandler> logger)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task Handle(UpdateAdmissionWaveRequest request, CancellationToken cancellationToken)
    {
        var wave = await _dbContext.AdmissionWaves
            .FirstOrDefaultAsync(w => w.Id == request.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"AdmissionWave {request.Id} not found.");

        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        wave.WaveNumber = request.WaveNumber;
        wave.Label = request.Label;
        wave.Deadline = request.Deadline;
        wave.Status = request.Status;
        wave.Color = request.Color;
        wave.PsikotesSchedule = request.PsikotesSchedule;
        wave.TertulisSchedule = request.TertulisSchedule;
        wave.WawancaraSchedule = request.WawancaraSchedule;
        wave.Steps = request.Steps.Select(s => new AdmissionWaveStepItem
        {
            StepNumber = s.StepNumber,
            Title = s.Title,
            WhenText = s.WhenText,
            Via = s.Via,
        }).ToList();
        wave.DisplayOrder = request.DisplayOrder;
        wave.IsActive = request.IsActive;
        wave.UpdatedBy = userId;
        wave.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("AdmissionWave {WaveId} updated by {UserId}", wave.Id, userId);
    }
}
