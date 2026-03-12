using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sttb.Commons.Constants;
using sttb.Contracts.RequestModels.Pages;
using sttb.Contracts.ResponseModels.Pages;

namespace sttb.WebAPI.Controllers;

[ApiController]
[Route("api/pages")]
[Authorize]
public class PagesController : ControllerBase
{
    private readonly IMediator _mediator;

    public PagesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{slug}")]
    [AllowAnonymous]
    public async Task<ActionResult<GetPageResponse>> Get(
        [FromRoute] string slug,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetPageRequest { Slug = slug }, cancellationToken);
        return Ok(result);
    }

    [HttpGet("list")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<List<GetPageResponse>>> List(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetPageListRequest(), cancellationToken);
        return Ok(result);
    }

    [HttpPost("create")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<Guid>> Create(
        [FromBody] CreatePageRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return CreatedAtAction(nameof(Get), new { slug = request.Slug }, result);
    }

    [HttpPut("update/{slug}")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Update(
        [FromRoute] string slug,
        [FromBody] UpdatePageRequest request,
        CancellationToken cancellationToken)
    {
        request.Slug = slug;
        await _mediator.Send(request, cancellationToken);
        return NoContent();
    }

    [HttpDelete("delete/{id}")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Delete(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeletePageRequest { Id = id }, cancellationToken);
        return NoContent();
    }
}
