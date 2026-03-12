using MediatR;
using Microsoft.AspNetCore.Http;
using sttb.Contracts.RequestModels.Scholarships;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.Scholarships;

public class CreateScholarshipRequestHandler : IRequestHandler<CreateScholarshipRequest, Guid>
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CreateScholarshipRequestHandler(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Guid> Handle(CreateScholarshipRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        var scholarship = new Scholarship
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Level = request.Level,
            Color = request.Color,
            ImageUrl = request.ImageUrl,
            Description = request.Description,
            Requirements = request.Requirements,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive,
            CreatedBy = userId,
            CreatedAt = DateTime.UtcNow,
        };

        _context.Scholarships.Add(scholarship);
        await _context.SaveChangesAsync(cancellationToken);

        return scholarship.Id;
    }
}
