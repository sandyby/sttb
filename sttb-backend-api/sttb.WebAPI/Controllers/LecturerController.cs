using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sttb.Commons.Constants;
using sttb.Contracts.RequestModels.Lecturers;
using sttb.Contracts.ResponseModels.Lecturers;

namespace sttb.WebAPI.Controllers;

[ApiController]
[Route("api/lecturers")]
[Authorize]
public class LecturerController : ControllerBase
{
    private readonly IMediator _mediator;

    public LecturerController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet(ApiRoutes.Lecturers.List)]
    [AllowAnonymous]
    public async Task<ActionResult<GetLecturerListResponse>> List(
        [FromQuery] GetLecturerListRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpPost(ApiRoutes.Lecturers.Create)]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<Guid>> Create(
        [FromBody] CreateLecturerRequest request,
        CancellationToken cancellationToken)
    {
        var id = await _mediator.Send(request, cancellationToken);
        return Ok(id);
    }

    [HttpPut("update/{id:guid}")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Update(
        [FromRoute] Guid id,
        [FromBody] UpdateLecturerRequest request,
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
        await _mediator.Send(new DeleteLecturerRequest { Id = id }, cancellationToken);
        return NoContent();
    }
}
