using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using sttb.Contracts.RequestModels.AdmissionWaves;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.AdmissionWaves;

public class CreateAdmissionWaveRequestHandler : IRequestHandler<CreateAdmissionWaveRequest, Guid>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<CreateAdmissionWaveRequestHandler> _logger;

    public CreateAdmissionWaveRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<CreateAdmissionWaveRequestHandler> logger)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task<Guid> Handle(CreateAdmissionWaveRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        var wave = new AdmissionWave
        {
            Id = Guid.NewGuid(),
            WaveNumber = request.WaveNumber,
            Label = request.Label,
            Deadline = request.Deadline,
            Status = request.Status,
            Color = request.Color,
            PsikotesSchedule = request.PsikotesSchedule,
            TertulisSchedule = request.TertulisSchedule,
            WawancaraSchedule = request.WawancaraSchedule,
            Steps = request.Steps.Select(s => new AdmissionWaveStepItem
            {
                StepNumber = s.StepNumber,
                Title = s.Title,
                WhenText = s.WhenText,
                Via = s.Via,
            }).ToList(),
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive,
            CreatedBy = userId,
            CreatedAt = DateTime.UtcNow,
        };

        _dbContext.AdmissionWaves.Add(wave);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("AdmissionWave {WaveId} ({Label}) created by {UserId}", wave.Id, wave.Label, userId);

        return wave.Id;
    }
}
