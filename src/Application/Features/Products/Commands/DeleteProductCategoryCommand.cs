using HopTri.Application.Common;
using HopTri.Application.Common.Interfaces;
using HopTri.Share.Common.Models;
using HopTri.Share.Localization;

namespace HopTri.Application.Features.Products.Commands;

public record DeleteProductCategoryCommand : IRequest<AppActionResultData<string>>
{
    public string Id { get; set; }
}

public class DeleteProductCategoryCommandHandler : BaseHandler, IRequestHandler<DeleteProductCategoryCommand, AppActionResultData<string>>
{
    private readonly IApplicationDbContext _context;

    public DeleteProductCategoryCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<AppActionResultData<string>> Handle(DeleteProductCategoryCommand request, CancellationToken cancellationToken)
    {
        var result = new AppActionResultData<string>();

        if (!Guid.TryParse(request.Id, out Guid _guidId))
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_INVALID_GUID_ID, request.Id);
        }

        var category = _context.ProductCategories.FirstOrDefault(x => x.Id == _guidId && x.Status != Domain.Enums.ProductCategoryStatus.DELETED);
        if (category is null)
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_DATA_WITH_ID_NOT_FOUND, request.Id);
        }

        category.Status = Domain.Enums.ProductCategoryStatus.DELETED;

        _context.ProductCategories.Update(category);
        await _context.SaveChangesAsync(cancellationToken);

        return BuildMultilingualResult(result, request.Id, Resources.INF_MSG_SAVE_SUCCESSFULLY);
    }
}
