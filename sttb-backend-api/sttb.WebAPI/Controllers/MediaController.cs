using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sttb.Commons.Constants;
using sttb.Contracts.RequestModels.Media;
using sttb.Contracts.ResponseModels.Media;

namespace sttb.WebAPI.Controllers;

[ApiController]
[Route("api/media")]
[Authorize]
public class MediaController : ControllerBase
{
    private readonly IMediator _mediator;

    public MediaController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet(ApiRoutes.Media.List)]
    [AllowAnonymous]
    public async Task<ActionResult<GetMediaListResponse>> List(
        [FromQuery] GetMediaListRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpGet(ApiRoutes.Media.Categories)]
    [AllowAnonymous]
    public async Task<ActionResult<List<string>>> Categories(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetMediaCategoriesRequest(), cancellationToken);
        return Ok(result);
    }

    [HttpPost(ApiRoutes.Media.Create)]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<Guid>> Create(
        [FromBody] CreateMediaRequest request,
        CancellationToken cancellationToken)
    {
        var id = await _mediator.Send(request, cancellationToken);
        return Ok(id);
    }

    [HttpDelete("delete/{id:guid}")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Delete(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteMediaRequest { Id = id }, cancellationToken);
        return NoContent();
    }
}
