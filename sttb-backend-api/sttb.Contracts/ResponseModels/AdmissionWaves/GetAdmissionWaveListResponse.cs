namespace sttb.Contracts.ResponseModels.AdmissionWaves;

public class GetAdmissionWaveListResponse
{
    public List<AdmissionWaveListItem> Items { get; set; } = new();
    public int TotalCount { get; set; }
}
