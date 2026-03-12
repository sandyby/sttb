namespace sttb.Contracts.ResponseModels.Lecturers;

public class GetLecturerListResponse
{
    public List<LecturerListItem> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}
