using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Foundation;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Foundation;

public class UpdateFoundationMemberRequestHandler : IRequestHandler<UpdateFoundationMemberRequest, Unit>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UpdateFoundationMemberRequestHandler(ApplicationDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Unit> Handle(UpdateFoundationMemberRequest request, CancellationToken cancellationToken)
    {
        var member = await _dbContext.FoundationMembers
            .FirstOrDefaultAsync(m => m.Id == request.Id, cancellationToken);

        if (member == null)
        {
            throw new KeyNotFoundException($"Foundation member with ID {request.Id} not found.");
        }

        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        member.Name = request.Name;
        member.Position = request.Position;
        member.Category = request.Category;
        member.Description = request.Description;
        member.ImageUrl = request.ImageUrl;
        member.DisplayOrder = request.DisplayOrder;
        member.IsActive = request.IsActive;
        member.UpdatedBy = userId;
        member.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
