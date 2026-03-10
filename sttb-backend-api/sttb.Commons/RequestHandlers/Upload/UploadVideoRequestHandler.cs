using MediatR;
using Microsoft.Extensions.Logging;
using sttb.Commons.Constants;
using sttb.Commons.Services;
using sttb.Contracts.RequestModels.Upload;
using sttb.Contracts.ResponseModels.Upload;

namespace sttb.Commons.RequestHandlers.Upload;

public class UploadVideoRequestHandler : IRequestHandler<UploadVideoRequest, UploadResponse>
{
    private readonly IFileService _fileService;
    private readonly ILogger<UploadVideoRequestHandler> _logger;

    public UploadVideoRequestHandler(
        IFileService fileService,
        ILogger<UploadVideoRequestHandler> logger)
    {
        _fileService = fileService;
        _logger = logger;
    }

    public async Task<UploadResponse> Handle(UploadVideoRequest request, CancellationToken cancellationToken)
    {
        if (request.FileSizeBytes > FileConstants.MaxVideoSizeBytes)
            throw new InvalidOperationException(
                $"File size exceeds the maximum allowed size of {FileConstants.MaxVideoSizeBytes / (1024 * 1024)} MB.");

        var url = await _fileService.SaveVideoAsync(
            request.FileStream,
            request.OriginalFileName,
            request.UploadType,
            cancellationToken);

        _logger.LogInformation("Video uploaded successfully: {Url}", url);

        return new UploadResponse { Url = url };
    }
}
