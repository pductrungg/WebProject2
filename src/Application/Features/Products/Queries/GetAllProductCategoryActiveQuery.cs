using HopTri.Application.Common;
using HopTri.Application.Common.Interfaces;
using HopTri.Application.Features.Products.Models.Dtos;
using HopTri.Domain.Entities.Features.Products;
using HopTri.Share.Cache.Contanst;
using HopTri.Share.Common.Models;
using HopTri.Share.Localization;
using Share.Common.Extensions;
using ZiggyCreatures.Caching.Fusion;

namespace HopTri.Application.Features.Products.Queries;

public record GetAllProductCategoryActiveQuery : IRequest<AppActionResultData<IList<ProductCategoryDto>>>
{
}

public class GetAllProductCategoryActiveQueryHandler : BaseHandler, IRequestHandler<GetAllProductCategoryActiveQuery, AppActionResultData<IList<ProductCategoryDto>>>
{
    private readonly IApplicationDbContext _context;
    private readonly IFusionCache _fusionCache;
    private readonly IMapper _mapper;

    public GetAllProductCategoryActiveQueryHandler(IApplicationDbContext context,
        IFusionCache fusionCache,
        IMapper mapper)
    {
        _context = context;
        _fusionCache = fusionCache;
        _mapper = mapper;
    }

    public async Task<AppActionResultData<IList<ProductCategoryDto>>> Handle(GetAllProductCategoryActiveQuery request, CancellationToken cancellationToken)
    {
        var result = new AppActionResultData<IList<ProductCategoryDto>>();

        var productCategoryDtos = await _fusionCache.GetOrDefaultAsync<IList<ProductCategoryDto>>(CacheKeys.ALL_PRODUCT_CATEGORY_ACTIVE);
        if (productCategoryDtos.IsNullOrEmpty())
        {
            var productCategories = await _context.ProductCategories.Include(x => x.ParentCategory)
                                                .Include(x => x.ChildCategories).AsNoTracking()
                                                .Where(x => x.Status == Domain.Enums.ProductCategoryStatus.ACTIVE)
                                                .ToListAsync();

            productCategoryDtos = _mapper.Map<IList<ProductCategory>, IList<ProductCategoryDto>>(productCategories);

            await _fusionCache.SetAsync(CacheKeys.ALL_PRODUCT_CATEGORY_ACTIVE, productCategoryDtos);
        }
        return BuildMultilingualResult(result, productCategoryDtos, Resources.INF_MSG_SUCCESSFULLY);
    }
}
