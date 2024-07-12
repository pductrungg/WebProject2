using HopTri.Application.Common;
using HopTri.Application.Common.Interfaces;
using HopTri.Application.Common.Mappings;
using HopTri.Application.Features.Products.Models.Dtos;
using HopTri.Share.Common.Models;
using HopTri.Share.Localization;
using Share.Common.Extensions;

namespace HopTri.Application.Features.Products.Queries;

public class GetProductCategoryWithSearchFilterAndPaginationQuery : IRequest<AppActionResultData<Common.Models.PaginatedList<ProductCategoryDto>>>
{
    public string SearchText { get; set; }
    public int PageIndex { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public class GetProductCategoryWithSearchFilterAndPaginationQueryHandler : BaseHandler, IRequestHandler<GetProductCategoryWithSearchFilterAndPaginationQuery, AppActionResultData<Common.Models.PaginatedList<ProductCategoryDto>>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetProductCategoryWithSearchFilterAndPaginationQueryHandler(IApplicationDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<AppActionResultData<Common.Models.PaginatedList<ProductCategoryDto>>> Handle(GetProductCategoryWithSearchFilterAndPaginationQuery request, CancellationToken cancellationToken)
    {
        var result = new AppActionResultData<Common.Models.PaginatedList<ProductCategoryDto>>();
        request.SearchText = request.SearchText?.Trim().ToLower() ?? string.Empty;

        var query = _context.ProductCategories.Include(x => x.ParentCategory)
                                              .Include(x => x.ChildCategories)
                                              .AsNoTracking().Where(x => x.Status != Domain.Enums.ProductCategoryStatus.DELETED);

        if (request.SearchText.IsNotNullNorEmpty() == true)
        {
            query = query.Where(x => x.Name != null && x.Name.ToLower().Contains(request.SearchText));
        }

        var response = await query
            .OrderByDescending(x => x.Created)
            .ProjectTo<ProductCategoryDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageIndex, request.PageSize);

        return BuildMultilingualResult(result, response, Resources.INF_MSG_SUCCESSFULLY);
    }
}

