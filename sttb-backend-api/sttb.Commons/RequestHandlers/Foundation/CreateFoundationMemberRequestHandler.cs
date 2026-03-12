using MediatR;
using Microsoft.AspNetCore.Http;
using sttb.Contracts.RequestModels.Foundation;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.Foundation;

public class CreateFoundationMemberRequestHandler : IRequestHandler<CreateFoundationMemberRequest, Guid>
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CreateFoundationMemberRequestHandler(ApplicationDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Guid> Handle(CreateFoundationMemberRequest request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        var member = new FoundationMember
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Position = request.Position,
            Category = request.Category,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive,
            CreatedBy = userId,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.FoundationMembers.Add(member);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return member.Id;
    }
}
