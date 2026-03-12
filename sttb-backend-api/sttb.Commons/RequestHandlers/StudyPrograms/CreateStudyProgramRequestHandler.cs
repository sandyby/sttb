using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using sttb.Contracts.RequestModels.StudyPrograms;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.StudyPrograms;

public class CreateStudyProgramRequestHandler : IRequestHandler<CreateStudyProgramRequest, Guid>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<CreateStudyProgramRequestHandler> _logger;

    public CreateStudyProgramRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<CreateStudyProgramRequestHandler> logger)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task<Guid> Handle(CreateStudyProgramRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        var program = new StudyProgram
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Slug = request.Slug,
            Level = request.Level,
            Degree = request.Degree,
            Accreditation = request.Accreditation,
            Tagline = request.Tagline,
            Description = request.Description,
            Duration = request.Duration,
            Credits = request.Credits,
            Vision = request.Vision,
            Mission = request.Mission,
            Objectives = request.Objectives,
            Courses = request.Courses,
            Careers = request.Careers,
            Tags = request.Tags,
            CoverImageUrl = request.CoverImageUrl,
            IsPublished = request.IsPublished,
            CreatedBy = userId,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.StudyPrograms.Add(program);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Study Program {Slug} created by {UserId}", request.Slug, userId);

        return program.Id;
    }
}
