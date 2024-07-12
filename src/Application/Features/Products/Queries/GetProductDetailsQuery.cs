using HopTri.Application.Common;
using HopTri.Application.Common.Interfaces;
using HopTri.Application.Features.Products.Models.Dtos;
using HopTri.Domain.Entities.Features.Products;
using HopTri.Share.Common.Models;
using HopTri.Share.Localization;

namespace HopTri.Application.Features.Products.Queries;

public record GetProductDetailsQuery : IRequest<AppActionResultData<ProductDto>>
{
    public string ProductId { get; set; }
}

public class GetProductDetailsQueryHandler : BaseHandler, IRequestHandler<GetProductDetailsQuery, AppActionResultData<ProductDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetProductDetailsQueryHandler(IApplicationDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<AppActionResultData<ProductDto>> Handle(GetProductDetailsQuery request, CancellationToken cancellationToken)
    {
        var result = new AppActionResultData<ProductDto>();

        if (!Guid.TryParse(request.ProductId, out Guid _guidProductId))
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_DATA_WITH_ID_NOT_FOUND, request.ProductId);
        }

        var product = _context.Products.Include(x => x.Category)
                                       .Include(x => x.ProductUnit)
                                       .Include(x => x.Specifications)
                                       .FirstOrDefault(x => x.Id == _guidProductId && x.Status != Domain.Enums.ProductStatus.DELETED);
        if (product is null)
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_DATA_WITH_ID_NOT_FOUND, nameof(request.ProductId));
        }

        var productDto = _mapper.Map<Product, ProductDto>(product);

        return BuildMultilingualResult(result, productDto, Resources.INF_MSG_SUCCESSFULLY);
    }
}
