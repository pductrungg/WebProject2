using System.Drawing.Imaging;
using HopTri.Application.Common;
using HopTri.Application.Common.Interfaces;
using HopTri.Domain.Entities.Features.Products;
using HopTri.Share.CloudinaryService.Interfaces;
using HopTri.Share.CloudinaryService.Requests;
using HopTri.Share.Common.Models;
using HopTri.Share.Localization;
using Share.Common.Contants;
using Share.Common.Extensions;
using Share.Common.Helpers;
using SixLabors.ImageSharp;

namespace HopTri.Application.Features.Products.Commands;

public record CreateProductCategoryCommand : IRequest<AppActionResultData<string>>
{
    public string Name { get; set; }
    public string PartnerCategoryCode { get; set; }
    public string Description { get; set; }
    public string Image { get; set; }
    public bool IsDisplayOnApp { get; set; }
    public string ParentCategoryId { get; set; }
}

public class CreateProductCategoryCommandHandler : BaseHandler, IRequestHandler<CreateProductCategoryCommand, AppActionResultData<string>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICloudinaryUploadService _cloudinaryUploadService;

    public CreateProductCategoryCommandHandler(IApplicationDbContext context, 
        ICloudinaryUploadService cloudinaryUploadService)
    {
        _context = context;
        _cloudinaryUploadService = cloudinaryUploadService;
    }

    public async Task<AppActionResultData<string>> Handle(CreateProductCategoryCommand request, CancellationToken cancellationToken)
    {
        var result = new AppActionResultData<string>();

        Guid? guidParentCategoryId = null;
        if (!string.IsNullOrEmpty(request.ParentCategoryId))
        {
            if (!Guid.TryParse(request.ParentCategoryId, out Guid _guidParentCategoryId))
            {
                return BuildMultilingualError(result, Resources.ERR_MSG_INVALID_GUID_ID, nameof(request.ParentCategoryId));
            }

            var parentCategory = _context.ProductCategories.AsNoTracking().FirstOrDefault(x => x.Id == _guidParentCategoryId && x.Status == Domain.Enums.ProductCategoryStatus.ACTIVE);
            if (parentCategory is null)
            {
                return BuildMultilingualError(result, Resources.ERR_MSG_DATA_WITH_ID_NOT_FOUND, nameof(request.ParentCategoryId));
            }

            guidParentCategoryId = _guidParentCategoryId;
        }

        string imageUrl = string.Empty;
        if (request.Image.IsNotNullNorEmpty())
        {
            if (!ImageUrlDetectorHelper.IsLink(request.Image))
            {
                var uploadResult = await ValidateAndUploadImageAsync(request.Image);
                if (!uploadResult.IsSuccess)
                {
                    return result.BuildError(uploadResult.Detail);
                }

                imageUrl = uploadResult.Data;
            }
        }

        var category = new ProductCategory
        {
            Name = request.Name,
            PartnerCategoryCode = request.PartnerCategoryCode,
            Description = request.Description,
            Image = imageUrl,
            IsDisplayOnApp = request.IsDisplayOnApp,
            ParentCategoryId = guidParentCategoryId,
            Status = Domain.Enums.ProductCategoryStatus.ACTIVE
        };

        _context.ProductCategories.Add(category);
        await _context.SaveChangesAsync(cancellationToken);

        return result.BuildResult(category.Id.ToString());
    }

    /// <summary>
    /// Validates the and upload image asynchronously.
    /// </summary>
    /// <param name="image"></param>
    /// <param name="generateId"></param>
    /// <returns></returns>
    private async Task<AppActionResultData<string>> ValidateAndUploadImageAsync(string image, string generateId = null)
    {
        var result = new AppActionResultData<string>();

        if (image.IsNullOrEmpty())
        {
            return result.BuildResult(null);
        }

        // Validate Base64 image string before upload image in CDN
        var imageData = image.FromBase64String();
        if (imageData is null)
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_IMAGE_INVALID_WITH_BASE64,null, nameof(CreateProductCategoryCommand.Image));
        }

        var generateNewId = generateId ?? Guid.NewGuid().ToString();

        try
        {
            var bytesToImage = imageData.BytesToImage();
            if (bytesToImage is null)
            {
                return BuildMultilingualError(result, Resources.ERR_MSG_IMAGE_INVALID_WITH_BYTE_TYPE, null, nameof(CreateProductCategoryCommand.Image));
            }

            // Upload banner to CDN
            var imageFormat = bytesToImage.RawFormat.ToString().ToLower();
            if (imageFormat != ImageFormatConstant.JPEG && imageFormat != ImageFormatConstant.PNG)
            {
                return BuildMultilingualError(result, Resources.ERR_MSG_IMAGE_INVALID_WITH_BYTE_TYPE, null, nameof(CreateProductCategoryCommand.Image));
            }

            var uploadResult = await UploadProductCategoryImageAsync(imageData, $"product_category_{generateNewId}", imageFormat);
            if (!uploadResult.IsSuccess)
            {
                return result.BuildError(uploadResult.Detail);
            }

            return BuildMultilingualResult(result, uploadResult.Data, Resources.INF_MSG_SUCCESSFULLY);
        }
        catch
        {
            MemoryStream ms = new MemoryStream(imageData);
            ms.Seek(0, SeekOrigin.Begin);
            var imageLoad = Image.Load(ms.ToArray());
            if (imageLoad is not null)
            {
                var uploadResult = await UploadProductCategoryImageAsync(imageData, $"product_category_{generateNewId}", ImageFormat.Jpeg.ToString().ToLower());
                if (!uploadResult.IsSuccess)
                {
                    return BuildMultilingualError(result, uploadResult.Detail);
                }

                return BuildMultilingualResult(result, uploadResult.Data, Resources.INF_MSG_SUCCESSFULLY);
            }
            else
            {
                return BuildMultilingualError(result, Resources.ERR_MSG_CANNOT_UPLOAD_IMAGE, $"product_category_{generateNewId}");
            }
        }
    }

    /// <summary>
    /// Uploads the product category image asynchronously.
    /// </summary>
    /// <param name="imageData"></param>
    /// <param name="imageName"></param>
    /// <param name="imageFormat"></param>
    /// <returns></returns>
    private async Task<AppActionResultData<string>> UploadProductCategoryImageAsync(byte[] imageData, string imageName, string imageFormat)
    {
        var result = new AppActionResultData<string>();
        var uploadData = new UploadDataRequest
        {
            Data = imageData,
            TargetName = $"HopTri/ProductCategory/Images",
            Extension = $".{imageFormat}",
            FileName = $"{imageName}.{imageFormat}"
        };

        var uploadResult = await _cloudinaryUploadService.UploadImageAsync(uploadData);
        if (!uploadResult.IsSuccess)
        {
            return BuildMultilingualError(result, Resources.ERR_MSG_CANNOT_UPLOAD_IMAGE, nameof(CreateProductCategoryCommand.Image));
        }

        return BuildMultilingualResult(result, uploadResult.Data, Resources.INF_MSG_SUCCESSFULLY);
    }
}
