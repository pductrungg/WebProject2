using HopTri.Application.Common;
using HopTri.Application.Common.Interfaces;
using HopTri.Share.Common.Models;
using HopTri.Share.Localization;

namespace HopTri.Application.Features.Products.Commands;

public record DeleteProductCommand : IRequest<AppActionResultData<string>>
{
    public string Id { get; set; }
}

public class DeleteProductCommandHandler : BaseHandler, IRequestHandler<DeleteProductCommand, AppActionResultData<string>>
{
    private readonly IApplicationDbContext _context;

    public DeleteProductCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<AppActionResultData<string>> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var result = new AppActionResultData<string>();

        if (!Guid.TryParse(request.Id, out Guid _guidId))
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_INVALID_GUID_ID, request.Id);
        }

        var product = _context.Products.FirstOrDefault(x => x.Id == _guidId && x.Status != Domain.Enums.ProductStatus.DELETED);
        if (product is null)
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_DATA_WITH_ID_NOT_FOUND, request.Id);
        }

        product.Status = Domain.Enums.ProductStatus.DELETED;

        _context.Products.Update(product);
        await _context.SaveChangesAsync(cancellationToken);

        return BuildMultilingualResult(result, request.Id, Resources.INF_MSG_SAVE_SUCCESSFULLY);
    }
}
