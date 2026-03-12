using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Contracts.RequestModels.Foundation;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.Foundation;

public class DeleteFoundationMemberRequestHandler : IRequestHandler<DeleteFoundationMemberRequest, Unit>
{
    private readonly ApplicationDbContext _dbContext;

    public DeleteFoundationMemberRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Unit> Handle(DeleteFoundationMemberRequest request, CancellationToken cancellationToken)
    {
        var member = await _dbContext.FoundationMembers
            .FirstOrDefaultAsync(m => m.Id == request.Id, cancellationToken);

        if (member == null)
        {
            throw new KeyNotFoundException($"Foundation member with ID {request.Id} not found.");
        }

        _dbContext.FoundationMembers.Remove(member);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
