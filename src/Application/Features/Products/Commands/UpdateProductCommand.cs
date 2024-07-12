using HopTri.Application.Common;
using HopTri.Application.Common.Interfaces;
using HopTri.Application.Features.Products.Models.Requests;
using HopTri.Domain.Entities.Features.Products;
using HopTri.Share.CloudinaryService.Interfaces;
using HopTri.Share.Common.Helpers;
using HopTri.Share.Common.Models;
using HopTri.Share.Localization;
using Share.Common.Extensions;

namespace HopTri.Application.Features.Products.Commands;

public class UpdateProductCommand : UpdateProductRequest, IRequest<AppActionResultData<string>>
{
}

public class UpdateProductCommandHandler : BaseHandler, IRequestHandler<UpdateProductCommand, AppActionResultData<string>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICloudinaryUploadService _cloudinaryUploadService;

    public UpdateProductCommandHandler(IApplicationDbContext context, 
        ICloudinaryUploadService cloudinaryUploadService)
    {
        _context = context;
        _cloudinaryUploadService = cloudinaryUploadService;
    }

    public async Task<AppActionResultData<string>> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var result = new AppActionResultData<string>();

        if (!Guid.TryParse(request.Id, out Guid _guidId))
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_INVALID_GUID_ID, request.Id);
        }

        if (!Guid.TryParse(request.CategoryId, out Guid _guidCategoryId))
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_INVALID_GUID_ID, nameof(request.CategoryId));
        }

        if (!Guid.TryParse(request.UnitId, out Guid _guidUnitId))
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_INVALID_GUID_ID, nameof(request.UnitId));
        }

        IList<ProductSpecifications> productSpecifications = null;
        if (request.Specifications.IsNotNullNorEmpty())
        {
            var convertIdsResult = request.Specifications.Select(x => x.UnitId).ToGuidIds();
            if (!convertIdsResult.IsSuccess)
            {
                return BuildMultilingualError(result, Resources.ERR_MSG_INVALID_DATA_TYPE, nameof(Guid));
            }

            productSpecifications = request.Specifications.Select(s => new ProductSpecifications
            {
                UnitId = Guid.Parse(s.UnitId),
                Quantity = s.Quantity
            }).ToList();
        }

        var product = _context.Products.FirstOrDefault(x => x.Id == _guidId && x.Status != Domain.Enums.ProductStatus.DELETED);
        if (product is null)
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_DATA_WITH_ID_NOT_FOUND, request.Id);
        }

        product.Name = request.Name;
        product.Code = request.Code;
        product.CommonCode = request.CommonCode;
        product.VideoLink = request.VideoLink;
        product.CategoryId = Guid.Parse(request.CategoryId);
        product.UnitId = Guid.Parse(request.UnitId);
        product.Type = request.Type;
        product.ShelfLife = request.ShelfLife;
        product.ShelfLifeType = request.ShelfLifeType;
        product.Weight = request.Weight;
        product.WeightType = request.WeightType;
        product.Volume = request.Volume;
        product.VolumeType = request.VolumeType;
        product.Specifications = productSpecifications;

        _context.Products.Update(product);
        await _context.SaveChangesAsync(cancellationToken);

        return BuildMultilingualResult(result, request.Id, Resources.INF_MSG_SAVE_SUCCESSFULLY);
    }
}
