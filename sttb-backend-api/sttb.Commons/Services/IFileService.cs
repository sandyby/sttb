namespace sttb.Commons.Services;

public interface IFileService
{
    Task<string> SaveImageAsync(Stream fileStream, string originalFileName, string uploadType, CancellationToken cancellationToken);
    Task<string> SaveVideoAsync(Stream fileStream, string originalFileName, string uploadType, CancellationToken cancellationToken);
    void Delete(string fileUrl);
}
