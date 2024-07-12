using HopTri.Domain.Enums;
using Share.Common.Models;

namespace HopTri.Application.Features.Products.Models.Dtos;
public class ProductDto : BaseAuditableEntityDto<string>
{
    public string Name { get; set; }
    public string Code { get; set; }
    public string CommonCode { get; set; }
    public string VideoLink { get; set; }
    public Guid CategoryId { get; set; }
    public Guid UnitId { get; set; }
    public ProductType Type { get; set; }
    public int ShelfLife { get; set; }
    public ProductShelfLifeType ShelfLifeType { get; set; }
    public double Weight { get; set; }
    public ProductWeightType WeightType { get; set; }
    public double Volume { get; set; }
    public ProductVolumeType VolumeType { get; set; }
    public ProductCategoryInfoDto Category { get; set; }
    public ProductUnitDto ProductUnit { get; set; }
    public ICollection<ProductImageDto> ProductImages { get; set; }
    public ICollection<ProductSpecificationsDto> Specifications { get; set; }
    public ProductStatus Status { get; set; }
}
