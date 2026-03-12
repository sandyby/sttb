using MediatR;
using Microsoft.EntityFrameworkCore;
using sttb.Commons.Exceptions;
using sttb.Contracts.RequestModels.StudyPrograms;
using sttb.Entities;

namespace sttb.Commons.RequestHandlers.StudyPrograms;

public class DeleteStudyProgramRequestHandler : IRequestHandler<DeleteStudyProgramRequest>
{
    private readonly ApplicationDbContext _dbContext;

    public DeleteStudyProgramRequestHandler(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Handle(DeleteStudyProgramRequest request, CancellationToken cancellationToken)
    {
        var program = await _dbContext.StudyPrograms
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (program is null)
            throw new NotFoundException("StudyProgram", request.Id.ToString());

        _dbContext.StudyPrograms.Remove(program);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
