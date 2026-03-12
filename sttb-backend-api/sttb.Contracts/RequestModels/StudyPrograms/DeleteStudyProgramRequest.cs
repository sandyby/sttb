using MediatR;

namespace sttb.Contracts.RequestModels.StudyPrograms;

public class DeleteStudyProgramRequest : IRequest
{
    public Guid Id { get; set; }
}
