using MediatR;
using Microsoft.Extensions.Logging;
using sttb.Commons.Constants;
using sttb.Commons.Services;
using sttb.Contracts.RequestModels.Upload;
using sttb.Contracts.ResponseModels.Upload;

namespace sttb.Commons.RequestHandlers.Upload;

public class UploadImageRequestHandler : IRequestHandler<UploadImageRequest, UploadResponse>
{
    private readonly IFileService _fileService;
    private readonly ILogger<UploadImageRequestHandler> _logger;

    public UploadImageRequestHandler(
        IFileService fileService,
        ILogger<UploadImageRequestHandler> logger)
    {
        _fileService = fileService;
        _logger = logger;
    }

    public async Task<UploadResponse> Handle(UploadImageRequest request, CancellationToken cancellationToken)
    {
        if (request.FileSizeBytes > FileConstants.MaxImageSizeBytes)
            throw new InvalidOperationException(
                $"File size exceeds the maximum allowed size of {FileConstants.MaxImageSizeBytes / (1024 * 1024)} MB.");

        var url = await _fileService.SaveImageAsync(
            request.FileStream,
            request.OriginalFileName,
            request.UploadType,
            cancellationToken);

        _logger.LogInformation("Image uploaded successfully: {Url}", url);

        return new UploadResponse { Url = url };
    }
}
