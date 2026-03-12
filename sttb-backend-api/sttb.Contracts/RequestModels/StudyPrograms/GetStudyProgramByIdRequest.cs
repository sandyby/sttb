using MediatR;
using sttb.Contracts.ResponseModels.StudyPrograms;

namespace sttb.Contracts.RequestModels.StudyPrograms;

public class GetStudyProgramByIdRequest : IRequest<GetStudyProgramResponse>
{
    public string Id { get; set; } = string.Empty;
}
