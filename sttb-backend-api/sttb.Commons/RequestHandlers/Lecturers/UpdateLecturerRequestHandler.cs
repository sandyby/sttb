using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using sttb.Contracts.RequestModels.Lecturers;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Lecturers;

public class UpdateLecturerRequestHandler : IRequestHandler<UpdateLecturerRequest>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<UpdateLecturerRequestHandler> _logger;

    public UpdateLecturerRequestHandler(
        ApplicationDbContext dbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger<UpdateLecturerRequestHandler> logger)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task Handle(UpdateLecturerRequest request, CancellationToken cancellationToken)
    {
        var lecturer = await _dbContext.Lecturers.FirstOrDefaultAsync(l => l.Id == request.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"Lecturer {request.Id} not found.");

        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        lecturer.Name = request.Name;
        lecturer.Title = request.Title;
        lecturer.Rank = request.Rank;
        lecturer.Degree = request.Degree;
        lecturer.Specialization = request.Specialization;
        lecturer.ImageUrl = request.ImageUrl;
        lecturer.Email = request.Email;
        lecturer.Bio = request.Bio;
        lecturer.Courses = request.Courses;
        lecturer.AlmaMater = request.AlmaMater;
        lecturer.Origin = request.Origin;
        lecturer.DisplayOrder = request.DisplayOrder;
        lecturer.IsActive = request.IsActive;
        lecturer.UpdatedBy = userId;
        lecturer.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Lecturer {LecturerId} updated by {UserId}", lecturer.Id, userId);
    }
}
