using Share.Common.Models;

namespace HopTri.Application.Features.Products.Models.Dtos;
public class ProductSpecificationsDto : BaseAuditableEntityDto<string>
{
    public string UnitId { get; set; }
    public string UnitName { get; set; }
    public decimal Quantity { get; set; }
}
