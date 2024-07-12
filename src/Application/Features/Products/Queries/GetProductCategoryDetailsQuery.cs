using HopTri.Application.Common;
using HopTri.Application.Common.Interfaces;
using HopTri.Application.Features.Products.Models.Dtos;
using HopTri.Domain.Entities.Features.Products;
using HopTri.Share.Common.Models;
using HopTri.Share.Localization;

namespace HopTri.Application.Features.Products.Queries;

public record GetProductCategoryDetailsQuery : IRequest<AppActionResultData<ProductCategoryDto>>
{
    public string CategoryId { get; set; }
}

public class GetProductCategoryDetailsQueryHandler : BaseHandler, IRequestHandler<GetProductCategoryDetailsQuery, AppActionResultData<ProductCategoryDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetProductCategoryDetailsQueryHandler(IApplicationDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<AppActionResultData<ProductCategoryDto>> Handle(GetProductCategoryDetailsQuery request, CancellationToken cancellationToken)
    {
        var result = new AppActionResultData<ProductCategoryDto>();

        if (!Guid.TryParse(request.CategoryId, out Guid _guidCategoryId))
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_DATA_WITH_ID_NOT_FOUND, request.CategoryId);
        }

        var productCategory = _context.ProductCategories.Include(x => x.ParentCategory)
                                                        .Include(x => x.ChildCategories).AsNoTracking()
                                                        .FirstOrDefault(x => x.Id == _guidCategoryId && x.Status != Domain.Enums.ProductCategoryStatus.DELETED);
        if (productCategory is null)
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_DATA_WITH_ID_NOT_FOUND, nameof(request.CategoryId));
        }

        var dtoProductCategory = _mapper.Map<ProductCategory, ProductCategoryDto>(productCategory);

        return BuildMultilingualResult(result, dtoProductCategory, Resources.INF_MSG_SUCCESSFULLY);
    }
}
