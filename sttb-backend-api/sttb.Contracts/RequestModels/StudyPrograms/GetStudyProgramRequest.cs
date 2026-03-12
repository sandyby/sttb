using MediatR;
using sttb.Contracts.ResponseModels.StudyPrograms;

namespace sttb.Contracts.RequestModels.StudyPrograms;

public class GetStudyProgramRequest : IRequest<GetStudyProgramResponse>
{
    public string Slug { get; set; } = string.Empty;
}
