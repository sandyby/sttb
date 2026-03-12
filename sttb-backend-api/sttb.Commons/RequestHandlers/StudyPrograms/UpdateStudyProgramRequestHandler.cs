using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sttb.Commons.Exceptions;
using sttb.Contracts.RequestModels.StudyPrograms;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.StudyPrograms;

public class UpdateStudyProgramRequestHandler : IRequestHandler<UpdateStudyProgramRequest>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<UpdateStudyProgramRequestHandler> _logger;

    public UpdateStudyProgramRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<UpdateStudyProgramRequestHandler> logger)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task Handle(UpdateStudyProgramRequest request, CancellationToken cancellationToken)
    {
        var program = await _dbContext.StudyPrograms
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (program is null)
            throw new NotFoundException("StudyProgram", request.Id.ToString());

        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        program.Name = request.Name;
        program.Slug = request.Slug;
        program.Level = request.Level;
        program.Degree = request.Degree;
        program.Accreditation = request.Accreditation;
        program.Tagline = request.Tagline;
        program.Description = request.Description;
        program.Duration = request.Duration;
        program.Credits = request.Credits;
        program.Vision = request.Vision;
        program.Mission = request.Mission;
        program.Objectives = request.Objectives;
        program.Courses = request.Courses;
        program.Careers = request.Careers;
        program.Tags = request.Tags;
        program.CoverImageUrl = request.CoverImageUrl;
        program.IsPublished = request.IsPublished;
        program.UpdatedBy = userId;
        program.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Study Program {Slug} updated by {UserId}", request.Slug, userId);
    }
}
