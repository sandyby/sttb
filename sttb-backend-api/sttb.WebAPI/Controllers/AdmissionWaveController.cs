using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sttb.Commons.Constants;
using sttb.Contracts.RequestModels.AdmissionWaves;
using sttb.Contracts.ResponseModels.AdmissionWaves;

namespace sttb.WebAPI.Controllers;

[ApiController]
[Route("api/admission-waves")]
[Authorize]
public class AdmissionWaveController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdmissionWaveController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet(ApiRoutes.AdmissionWaves.List)]
    [AllowAnonymous]
    public async Task<ActionResult<GetAdmissionWaveListResponse>> List(
        [FromQuery] GetAdmissionWaveListRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpPost(ApiRoutes.AdmissionWaves.Create)]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<Guid>> Create(
        [FromBody] CreateAdmissionWaveRequest request,
        CancellationToken cancellationToken)
    {
        var id = await _mediator.Send(request, cancellationToken);
        return Ok(id);
    }

    [HttpPut("update/{id:guid}")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Update(
        [FromRoute] Guid id,
        [FromBody] UpdateAdmissionWaveRequest request,
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
        await _mediator.Send(new DeleteAdmissionWaveRequest { Id = id }, cancellationToken);
        return NoContent();
    }
}
