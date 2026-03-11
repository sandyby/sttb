using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sttb.Commons.Constants;
using sttb.Contracts.RequestModels.Events;
using sttb.Contracts.ResponseModels.Events;

namespace sttb.WebAPI.Controllers;

[ApiController]
[Route("api/events")]
[Authorize]
public class EventsController : ControllerBase
{
    private readonly IMediator _mediator;

    public EventsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet(ApiRoutes.Events.List)]
    [AllowAnonymous]
    public async Task<ActionResult<GetEventListResponse>> List(
        [FromQuery] GetEventListRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpGet(ApiRoutes.Events.Categories)]
    [AllowAnonymous]
    public async Task<ActionResult<List<string>>> Categories(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetEventCategoriesRequest(), cancellationToken);
        return Ok(result);
    }

    [HttpPost(ApiRoutes.Events.Create)]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<Guid>> Create(
        [FromBody] CreateEventRequest request,
        CancellationToken cancellationToken)
    {
        var id = await _mediator.Send(request, cancellationToken);
        return Ok(id);
    }

    [HttpPut("update/{id:guid}")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Update(
        [FromRoute] Guid id,
        [FromBody] UpdateEventRequest request,
        CancellationToken cancellationToken)
    {
        request.Id = id;
        await _mediator.Send(request, cancellationToken);
        return NoContent();
    }

    [HttpDelete("delete/{id:guid}")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Delete(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteEventRequest { Id = id }, cancellationToken);
        return NoContent();
    }
}
