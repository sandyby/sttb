using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using sttb.Commons.Exceptions;
using sttb.Contracts.RequestModels.Scholarships;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.Scholarships;

public class UpdateScholarshipRequestHandler : IRequestHandler<UpdateScholarshipRequest, Unit>
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UpdateScholarshipRequestHandler(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Unit> Handle(UpdateScholarshipRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        var scholarship = await _context.Scholarships
            .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);

        if (scholarship == null)
        {
            throw new NotFoundException(nameof(Scholarship), request.Id);
        }

        scholarship.Name = request.Name;
        scholarship.Level = request.Level;
        scholarship.Color = request.Color;
        scholarship.ImageUrl = request.ImageUrl;
        scholarship.Description = request.Description;
        scholarship.Requirements = request.Requirements;
        scholarship.DisplayOrder = request.DisplayOrder;
        scholarship.IsActive = request.IsActive;
        scholarship.UpdatedBy = userId;
        scholarship.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
