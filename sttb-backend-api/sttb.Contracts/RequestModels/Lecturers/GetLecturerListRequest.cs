using MediatR;
using sttb.Contracts.ResponseModels.Lecturers;

namespace sttb.Contracts.RequestModels.Lecturers;

public class GetLecturerListRequest : IRequest<GetLecturerListResponse>
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 50;

    /// <summary>Filter by rank: "pimpinan", "tetap", or "tidak-tetap"</summary>
    public string? Rank { get; set; }

    public string? Search { get; set; }

    public bool? IsActive { get; set; }
}
