using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.StudyPrograms;
using sttb.Contracts.ResponseModels.StudyPrograms;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.StudyPrograms;

public class GetStudyProgramListRequestHandler : IRequestHandler<GetStudyProgramListRequest, List<GetStudyProgramResponse>>
{
    private readonly ApplicationDbContext _dbContext;

    public GetStudyProgramListRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<GetStudyProgramResponse>> Handle(GetStudyProgramListRequest request, CancellationToken cancellationToken)
    {
        var query = _dbContext.StudyPrograms.AsNoTracking();

        if (!string.IsNullOrEmpty(request.Level))
        {
            query = query.Where(p => p.Level == request.Level);
        }

        return await query
            .OrderBy(p => p.Level)
            .ThenBy(p => p.Name)
            .Select(program => new GetStudyProgramResponse
            {
                Id = program.Id,
                Name = program.Name,
                Slug = program.Slug,
                Level = program.Level,
                Degree = program.Degree,
                Accreditation = program.Accreditation,
                Tagline = program.Tagline,
                Description = program.Description,
                Duration = program.Duration,
                Credits = program.Credits,
                Vision = program.Vision,
                Mission = program.Mission,
                Objectives = program.Objectives,
                Courses = program.Courses,
                Careers = program.Careers,
                Tags = program.Tags,
                CoverImageUrl = program.CoverImageUrl,
                IsPublished = program.IsPublished,
                CreatedAt = program.CreatedAt,
                CreatedBy = program.CreatedBy,
                UpdatedAt = program.UpdatedAt,
                UpdatedBy = program.UpdatedBy
            })
            .ToListAsync(cancellationToken);
    }
}
