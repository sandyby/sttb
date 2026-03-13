using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Commons.Exceptions;
using sttb.Contracts.RequestModels.Scholarships;
using sttb.Entities;
using sttb.Entities.Models;

namespace sttb.Commons.RequestHandlers.Scholarships;

public class DeleteScholarshipRequestHandler : IRequestHandler<DeleteScholarshipRequest, Unit>
{
    private readonly ApplicationDbContext _context;

    public DeleteScholarshipRequestHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteScholarshipRequest request, CancellationToken cancellationToken)
    {
        var scholarship = await _context.Scholarships
            .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);

        if (scholarship == null)
        {
            throw new NotFoundException(nameof(Scholarship), request.Id);
        }

        _context.Scholarships.Remove(scholarship);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
