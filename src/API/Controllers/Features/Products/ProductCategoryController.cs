using HopTri.Application.Common.Models;
using HopTri.Application.Features.Products.Commands;
using HopTri.Application.Features.Products.Models.Dtos;
using HopTri.Application.Features.Products.Queries;
using HopTri.Share.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace HopTri.API.Controllers.Features.Products;

[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/product-category")]
public class ProductCategoryController : ApiControllerBase
{
    /// <summary>
    /// All product category asynchronously.
    /// </summary>
    /// <returns></returns>
    [HttpGet("all")]
    [ProducesResponseType(typeof(AppApiResult<IList<ProductCategoryDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppApiResult<IList<ProductCategoryDto>>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetAllProductCategoryAsync()
    {
        var result = await Mediator.Send(new GetAllProductCategoryQuery {});
        if (result.IsSuccess)
        {
            return Success(result.Data, result.Detail);
        }

        return ClientError(result.Detail);
    }

    /// <summary>
    /// All product category are active asynchronously.
    /// </summary>
    /// <returns></returns>
    [HttpGet("all-active")]
    [ProducesResponseType(typeof(AppApiResult<IList<ProductCategoryDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppApiResult<IList<ProductCategoryDto>>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetAllProductCategoryActiveAsync()
    {
        var result = await Mediator.Send(new GetAllProductCategoryActiveQuery { });
        if (result.IsSuccess)
        {
            return Success(result.Data, result.Detail);
        }

        return ClientError(result.Detail);
    }

    /// <summary>
    /// Create product category asynchronously
    /// </summary>
    /// <param name="command"></param>
    /// <returns></returns>
    [HttpPost("create")]
    [ProducesResponseType(typeof(AppApiResult<string>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppApiResult<string>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateProductCategoryAsync(CreateProductCategoryCommand command)
    {

        if (!ModelState.IsValid)
        {
            return ClientError(ModelState);
        }

        var result = await Mediator.Send(command);

        if (result.IsSuccess)
        {
            return Success(result.Data);
        }

        return ClientError(result.Detail);
    }

    /// <summary>
    /// Details product category asynchronously.
    /// </summary>
    /// <param name="categoryId"></param>
    /// <returns></returns>
    [HttpGet("details/{categoryId}")]
    [ProducesResponseType(typeof(AppApiResult<ProductCategoryDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppApiResult<ProductCategoryDto>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetProductCategoryDetailsAsync(string categoryId)
    {
        var result = await Mediator.Send(new GetProductCategoryDetailsQuery { CategoryId = categoryId });
        if (result.IsSuccess)
        {
            return Success(result.Data, result.Detail);
        }

        return ClientError(result.Detail);
    }

    /// <summary>
    /// Update product category asynchronously
    /// </summary>
    /// <param name="command"></param>
    /// <returns></returns>
    [HttpPut("update")]
    [ProducesResponseType(typeof(AppApiResult<string>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppApiResult<string>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateProductCategoryAsync(UpdateProductCategoryCommand command)
    {

        if (!ModelState.IsValid)
        {
            return ClientError(ModelState);
        }

        var result = await Mediator.Send(command);

        if (result.IsSuccess)
        {
            return Success(result.Data);
        }

        return ClientError(result.Detail);
    }

    /// <summary>
    /// Search product category asynchronously
    /// </summary>
    /// <param name="query"></param>
    /// <returns></returns>
    [HttpPost("search")]
    [ProducesResponseType(typeof(AppApiResult<PaginatedList<ProductCategoryDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppApiResult<PaginatedList<ProductCategoryDto>>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetProductCategoryWithSearchFilterAndPaginationQueryAsync(GetProductCategoryWithSearchFilterAndPaginationQuery query)
    {
        if (!ModelState.IsValid)
        {
            return ClientError(ModelState);
        }

        var result = await Mediator.Send(query);

        if (result.IsSuccess)
        {
            return Success(result.Data);
        }

        return ClientError(result.Detail);
    }

    /// <summary>
    /// Delete product category asynchronously
    /// </summary>
    /// <param name="categoryId"></param>
    /// <returns></returns>
    [HttpDelete("delete/{categoryId}")]
    [ProducesResponseType(typeof(AppApiResult<string>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppApiResult<string>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DeleteProductCategoryAsync(string categoryId)
    {

        var result = await Mediator.Send(new DeleteProductCategoryCommand { Id = categoryId });

        if (result.IsSuccess)
        {
            return Success(result.Data);
        }

        return ClientError(result.Detail);
    }
}
