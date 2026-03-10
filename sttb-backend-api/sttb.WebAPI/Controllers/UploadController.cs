using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using sttb.Commons.Constants;
using sttb.Contracts.RequestModels.Upload;
using sttb.Contracts.ResponseModels.Upload;

namespace sttb.WebAPI.Controllers;

[ApiController]
[Route("api/upload")]
[Authorize(Roles = Roles.Admin)]
public class UploadController : ControllerBase
{
    private readonly IMediator _mediator;

    public UploadController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost(ApiRoutes.Upload.Image)]
    [EnableRateLimiting("upload")]
    [RequestSizeLimit(10 * 1024 * 1024)] // 10 MB
    public async Task<ActionResult<UploadResponse>> UploadImage(
        IFormFile file,
        [FromQuery] string uploadType,
        CancellationToken cancellationToken)
    {
        await using var stream = file.OpenReadStream();

        var request = new UploadImageRequest
        {
            FileStream = stream,
            OriginalFileName = file.FileName,
            FileSizeBytes = file.Length,
            UploadType = uploadType
        };

        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpPost(ApiRoutes.Upload.Video)]
    [EnableRateLimiting("upload")]
    [RequestSizeLimit(500 * 1024 * 1024)] // 500 MB
    public async Task<ActionResult<UploadResponse>> UploadVideo(
        IFormFile file,
        [FromQuery] string uploadType,
        CancellationToken cancellationToken)
    {
        await using var stream = file.OpenReadStream();

        var request = new UploadVideoRequest
        {
            FileStream = stream,
            OriginalFileName = file.FileName,
            FileSizeBytes = file.Length,
            UploadType = uploadType
        };

        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }
}
