using HopTri.Application.Common.Models;
using HopTri.Application.Features.Products.Commands;
using HopTri.Application.Features.Products.Models.Dtos;
using HopTri.Application.Features.Products.Queries;
using HopTri.Share.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace HopTri.API.Controllers.Features.Products;

[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/product")]
public class ProductController : ApiControllerBase
{
    /// <summary>
    /// Create product asynchronously
    /// </summary>
    /// <param name="command"></param>
    /// <returns></returns>
    [HttpPost("create")]
    [ProducesResponseType(typeof(AppApiResult<string>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppApiResult<string>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateProductAsync([FromForm] CreateProductCommand command)
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
    /// Details product asynchronously.
    /// </summary>
    /// <param name="productId"></param>
    /// <returns></returns>
    [HttpGet("details/{productId}")]
    [ProducesResponseType(typeof(AppApiResult<ProductDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppApiResult<ProductDto>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetProductCategoryDetailsAsync(string productId)
    {
        var result = await Mediator.Send(new GetProductDetailsQuery { ProductId = productId });
        if (result.IsSuccess)
        {
            return Success(result.Data, result.Detail);
        }

        return ClientError(result.Detail);
    }

    /// <summary>
    /// Update product asynchronously
    /// </summary>
    /// <param name="command"></param>
    /// <returns></returns>
    [HttpPut("update")]
    [ProducesResponseType(typeof(AppApiResult<string>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppApiResult<string>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateProductCategoryAsync([FromForm] UpdateProductCommand command)
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
    /// Search product asynchronously
    /// </summary>
    /// <param name="query"></param>
    /// <returns></returns>
    [HttpPost("search")]
    [ProducesResponseType(typeof(AppApiResult<PaginatedList<ProductDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppApiResult<PaginatedList<ProductDto>>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetProductWithSearchFilterAndPaginationQueryAsync(GetProductWithSearchFilterAndPaginationQuery query)
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
    /// Delete product asynchronously
    /// </summary>
    /// <param name="productId"></param>
    /// <returns></returns>
    [HttpDelete("delete/{productId}")]
    [ProducesResponseType(typeof(AppApiResult<string>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(AppApiResult<string>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DeleteProductAsync(string productId)
    {

        var result = await Mediator.Send(new DeleteProductCommand { Id = productId });

        if (result.IsSuccess)
        {
            return Success(result.Data);
        }

        return ClientError(result.Detail);
    }
}
