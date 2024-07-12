using HopTri.Application.Common;
using HopTri.Application.Common.Interfaces;
using HopTri.Application.Features.Products.Models.Requests;
using HopTri.Domain.Entities.Features.Products;
using HopTri.Share.CloudinaryService.Interfaces;
using HopTri.Share.Common.Helpers;
using HopTri.Share.Common.Models;
using HopTri.Share.Localization;
using Share.Common.Extensions;
using SixLabors.ImageSharp;

namespace HopTri.Application.Features.Products.Commands;

public class CreateProductCommand : CreateProductRequest, IRequest<AppActionResultData<string>>
{

}

public class CreateProductCommandHandler : BaseHandler, IRequestHandler<CreateProductCommand, AppActionResultData<string>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICloudinaryUploadService _cloudinaryUploadService;

    public CreateProductCommandHandler(IApplicationDbContext context, 
        ICloudinaryUploadService cloudinaryUploadService)
    {
        _context = context;
        _cloudinaryUploadService = cloudinaryUploadService;
    }

    public async Task<AppActionResultData<string>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var result = new AppActionResultData<string>();

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

            productSpecifications =  request.Specifications.Select(s => new ProductSpecifications
            {
                UnitId = Guid.Parse(s.UnitId),
                Quantity = s.Quantity
            }).ToList();
        }

        var newProduct = new Product
        {
            Name = request.Name,
            Code = request.Code,
            CommonCode = request.CommonCode,
            VideoLink = request.VideoLink,
            CategoryId = _guidCategoryId,
            UnitId = _guidUnitId,
            Type = request.Type,
            ShelfLife = request.ShelfLife,
            ShelfLifeType = request.ShelfLifeType,
            Weight = request.Weight,
            WeightType = request.WeightType,
            Volume = request.Volume,
            VolumeType = request.VolumeType,
            Specifications = productSpecifications
        };

        _context.Products.Add(newProduct);
        await _context.SaveChangesAsync(cancellationToken);

        return BuildMultilingualResult(result, newProduct.Id.ToString(), Resources.INF_MSG_SAVE_SUCCESSFULLY);
    }
}
