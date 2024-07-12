using HopTri.Domain.Enums;
using Share.Common.Models;

namespace HopTri.Application.Features.Products.Models.Dtos;
public class ProductCategoryDto : BaseAuditableEntityDto<string>
{
    public string Name { get; set; }
    public string PartnerCategoryCode { get; set; }
    public string Description { get; set; }
    public bool IsDisplayOnApp { get; set; }
    public string Image { get; set; }
    public ProductCategoryStatus Status { get; set; }
    public string ParentCategoryId { get; set; }
    public ProductCategoryInfoDto ParentCategory { get; set; }
    public ICollection<ProductCategoryInfoDto> ChildCategories { get; set; } = new List<ProductCategoryInfoDto>();
}
