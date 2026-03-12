using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.AdmissionWaves;
using sttb.Contracts.ResponseModels.AdmissionWaves;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.AdmissionWaves;

public class GetAdmissionWaveListRequestHandler
    : IRequestHandler<GetAdmissionWaveListRequest, GetAdmissionWaveListResponse>
{
    private readonly ApplicationDbContext _dbContext;

    public GetAdmissionWaveListRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetAdmissionWaveListResponse> Handle(
        GetAdmissionWaveListRequest request,
        CancellationToken cancellationToken)
    {
        var query = _dbContext.AdmissionWaves.AsNoTracking();

        if (request.IsActive.HasValue)
            query = query.Where(w => w.IsActive == request.IsActive.Value);

        var items = await query
            .OrderBy(w => w.DisplayOrder)
            .ThenBy(w => w.WaveNumber)
            .Select(w => new AdmissionWaveListItem
            {
                Id = w.Id,
                WaveNumber = w.WaveNumber,
                Label = w.Label,
                Deadline = w.Deadline,
                Status = w.Status,
                Color = w.Color,
                PsikotesSchedule = w.PsikotesSchedule,
                TertulisSchedule = w.TertulisSchedule,
                WawancaraSchedule = w.WawancaraSchedule,
                Steps = w.Steps.Select(s => new AdmissionWaveStepDto
                {
                    StepNumber = s.StepNumber,
                    Title = s.Title,
                    WhenText = s.WhenText,
                    Via = s.Via,
                }).ToList(),
                DisplayOrder = w.DisplayOrder,
                IsActive = w.IsActive,
            })
            .ToListAsync(cancellationToken);

        return new GetAdmissionWaveListResponse { Items = items };
    }
}
