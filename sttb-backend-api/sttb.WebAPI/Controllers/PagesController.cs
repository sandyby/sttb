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

    [HttpGet(ApiRoutes.Pages.Get)]
    [AllowAnonymous]
    public async Task<ActionResult<GetPageResponse>> Get(
        [FromRoute] string slug,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetPageRequest { Slug = slug }, cancellationToken);
        return Ok(result);
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
}
