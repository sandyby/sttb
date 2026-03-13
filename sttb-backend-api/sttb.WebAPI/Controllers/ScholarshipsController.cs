using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sttb.Commons.Constants;
using sttb.Contracts.RequestModels.Scholarships;
using sttb.Contracts.ResponseModels.Scholarships;

namespace sttb.WebAPI.Controllers;

[ApiController]
[Route("api/scholarships")]
[Authorize]
public class ScholarshipsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ScholarshipsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet(ApiRoutes.Scholarships.List)]
    [AllowAnonymous]
    public async Task<ActionResult<GetScholarshipListResponse>> List(
        [FromQuery] bool? isActive,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetScholarshipListRequest { IsActive = isActive }, cancellationToken);
        return Ok(result);
    }

    [HttpPost(ApiRoutes.Scholarships.Create)]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<Guid>> Create(
        [FromBody] CreateScholarshipRequest request,
        CancellationToken cancellationToken)
    {
        var id = await _mediator.Send(request, cancellationToken);
        return Ok(id);
    }

    [HttpPut("update/{id:guid}")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Update(
        [FromRoute] Guid id,
        [FromBody] UpdateScholarshipRequest request,
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
        await _mediator.Send(new DeleteScholarshipRequest { Id = id }, cancellationToken);
        return NoContent();
    }
}
