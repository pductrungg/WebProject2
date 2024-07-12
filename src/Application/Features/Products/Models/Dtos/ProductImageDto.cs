using Share.Common.Models;

namespace HopTri.Application.Features.Products.Models.Dtos;
public class ProductImageDto : BaseAuditableEntityDto<string>
{
    public string Name { get; set; }
    public string Url { get; set; }
}
