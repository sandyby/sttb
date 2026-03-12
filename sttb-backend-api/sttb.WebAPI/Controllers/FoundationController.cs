using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sttb.Commons.Constants;
using sttb.Contracts.RequestModels.Foundation;
using sttb.Contracts.ResponseModels.Foundation;

namespace sttb.WebAPI.Controllers;

[ApiController]
[Route("api/foundation")]
[Authorize]
public class FoundationController : ControllerBase
{
    private readonly IMediator _mediator;

    public FoundationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet(ApiRoutes.Foundation.List)]
    [AllowAnonymous]
    public async Task<ActionResult<GetFoundationMemberListResponse>> List(
        [FromQuery] GetFoundationMemberListRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpPost(ApiRoutes.Foundation.Create)]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<Guid>> Create(
        [FromBody] CreateFoundationMemberRequest request,
        CancellationToken cancellationToken)
    {
        var id = await _mediator.Send(request, cancellationToken);
        return Ok(id);
    }

    [HttpPut(ApiRoutes.Foundation.Update)]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Update(
        [FromRoute] Guid id,
        [FromBody] UpdateFoundationMemberRequest request,
        CancellationToken cancellationToken)
    {
        request.Id = id;
        await _mediator.Send(request, cancellationToken);
        return NoContent();
    }

    [HttpDelete(ApiRoutes.Foundation.Delete)]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Delete(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteFoundationMemberRequest(id), cancellationToken);
        return NoContent();
    }
}
