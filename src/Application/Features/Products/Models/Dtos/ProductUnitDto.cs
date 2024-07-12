using Share.Common.Models;

namespace HopTri.Application.Features.Products.Models.Dtos;
public class ProductUnitDto : BaseAuditableEntityDto<string>
{
    public string Name { get; set; }
}
