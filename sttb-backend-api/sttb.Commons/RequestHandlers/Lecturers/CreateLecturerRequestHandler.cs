using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using sttb.Contracts.RequestModels.Lecturers;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.Lecturers;

public class CreateLecturerRequestHandler : IRequestHandler<CreateLecturerRequest, Guid>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<CreateLecturerRequestHandler> _logger;

    public CreateLecturerRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<CreateLecturerRequestHandler> logger)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task<Guid> Handle(CreateLecturerRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        var lecturer = new Lecturer
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Title = request.Title,
            Rank = request.Rank,
            Degree = request.Degree,
            Specialization = request.Specialization,
            ImageUrl = request.ImageUrl,
            Email = request.Email,
            Bio = request.Bio,
            Courses = request.Courses,
            AlmaMater = request.AlmaMater,
            Origin = request.Origin,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive,
            CreatedBy = userId,
            CreatedAt = DateTime.UtcNow,
        };

        _dbContext.Lecturers.Add(lecturer);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Lecturer {LecturerId} created by {UserId}", lecturer.Id, userId);

        return lecturer.Id;
    }
}
