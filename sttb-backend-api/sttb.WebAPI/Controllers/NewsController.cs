using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sttb.Commons.Constants;
using sttb.Contracts.RequestModels.News;
using sttb.Contracts.ResponseModels.News;
using sttb.Contracts.ResponseModels.Shared;

namespace sttb.WebAPI.Controllers;

[ApiController]
[Route("api/news")]
[Authorize]
public class NewsController : ControllerBase
{
    private readonly IMediator _mediator;

    public NewsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet(ApiRoutes.News.List)]
    [AllowAnonymous]
    public async Task<ActionResult<GetNewsListResponse>> List(
        [FromQuery] GetNewsListRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    [HttpGet(ApiRoutes.News.Categories)]
    [AllowAnonymous]
    public async Task<ActionResult<List<CategoryResponse>>> Categories(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetNewsCategoriesRequest(), cancellationToken);
        return Ok(result);
    }

    [HttpPost(ApiRoutes.News.CategoriesCreate)]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<Guid>> CreateCategory(
        [FromBody] CreateNewsCategoryRequest request,
        CancellationToken cancellationToken)
    {
        var id = await _mediator.Send(request, cancellationToken);
        return Ok(id);
    }

    [HttpDelete(ApiRoutes.News.CategoriesDelete)]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> DeleteCategory(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteNewsCategoryRequest { Id = id }, cancellationToken);
        return NoContent();
    }

    [HttpGet(ApiRoutes.News.Detail)]
    [AllowAnonymous]
    public async Task<ActionResult<GetNewsDetailResponse>> Detail(
        [FromRoute] string slug,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetNewsDetailRequest { Slug = slug }, cancellationToken);
        return Ok(result);
    }

    [HttpPost(ApiRoutes.News.Create)]
    [Authorize(Roles = Roles.Admin)]
    public async Task<ActionResult<Guid>> Create(
        [FromBody] CreateNewsRequest request,
        CancellationToken cancellationToken)
    {
        var id = await _mediator.Send(request, cancellationToken);
        return Ok(id);
    }

    [HttpPut("update/{id:guid}")]
    [Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Update(
        [FromRoute] Guid id,
        [FromBody] UpdateNewsRequest request,
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
        await _mediator.Send(new DeleteNewsRequest { Id = id }, cancellationToken);
        return NoContent();
    }
}
