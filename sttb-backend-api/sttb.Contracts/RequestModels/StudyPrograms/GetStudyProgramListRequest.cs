using MediatR;
using sttb.Contracts.ResponseModels.StudyPrograms;

namespace sttb.Contracts.RequestModels.StudyPrograms;

public class GetStudyProgramListRequest : IRequest<List<GetStudyProgramResponse>>
{
    public string? Level { get; set; }
    public bool? IsPublished { get; set; }
}
