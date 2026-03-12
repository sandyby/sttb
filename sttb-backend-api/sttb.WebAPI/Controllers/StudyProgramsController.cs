using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sttb.Commons.Constants;
using sttb.Contracts.RequestModels.StudyPrograms;
using sttb.Contracts.ResponseModels.StudyPrograms;

namespace sttb.WebAPI.Controllers;

[ApiController]
[Route("api/study-programs")]
[Authorize]
public class StudyProgramsController : ControllerBase
{
    private readonly IMediator _mediator;

    public StudyProgramsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("list")]
    [AllowAnonymous]
    public async Task<ActionResult<List<GetStudyProgramResponse>>> List(
        [FromQuery] string? level,
        CancellationToken cancellationToken
    )
    {
        var result = await _mediator.Send(
            new GetStudyProgramListRequest { Level = level },
            cancellationToken
        );
        return Ok(result);
    }

    [HttpGet("{slug}")]
    [AllowAnonymous]
    public async Task<ActionResult<GetStudyProgramResponse>> Get(
        [FromRoute] string slug,
        CancellationToken cancellationToken
    )
    {
        var result = await _mediator.Send(
            new GetStudyProgramRequest { Slug = slug },
            cancellationToken
        );
        return Ok(result);
    }

    [HttpPost("create")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<Guid>> Create(
        [FromBody] CreateStudyProgramRequest request,
        CancellationToken cancellationToken
    )
    {
        var result = await _mediator.Send(request, cancellationToken);
        return CreatedAtAction(nameof(Get), new { slug = request.Slug }, result);
    }

    [HttpPut("update/{id}")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Update(
        [FromRoute] Guid id,
        [FromBody] UpdateStudyProgramRequest request,
        CancellationToken cancellationToken
    )
    {
        request.Id = id;
        await _mediator.Send(request, cancellationToken);
        return NoContent();
    }

    [HttpDelete("delete/{id}")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Delete(
        [FromRoute] Guid id,
        CancellationToken cancellationToken
    )
    {
        await _mediator.Send(new DeleteStudyProgramRequest { Id = id }, cancellationToken);
        return NoContent();
    }
}
