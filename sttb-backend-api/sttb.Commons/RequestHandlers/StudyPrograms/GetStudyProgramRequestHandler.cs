using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Commons.Exceptions;
using sttb.Contracts.RequestModels.StudyPrograms;
using sttb.Contracts.ResponseModels.StudyPrograms;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.StudyPrograms;

public class GetStudyProgramRequestHandler : IRequestHandler<GetStudyProgramRequest, GetStudyProgramResponse>
{
    private readonly ApplicationDbContext _dbContext;

    public GetStudyProgramRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetStudyProgramResponse> Handle(GetStudyProgramRequest request, CancellationToken cancellationToken)
    {
        var program = await _dbContext.StudyPrograms
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Slug == request.Slug, cancellationToken);

        if (program is null)
            throw new NotFoundException("StudyProgram", request.Slug);

        return new GetStudyProgramResponse
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
        };
    }
}
