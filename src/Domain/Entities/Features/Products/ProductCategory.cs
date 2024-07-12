using HopTri.Domain.Enums;

namespace HopTri.Domain.Entities.Features.Products;

public class ProductCategory : BaseAuditableEntity<Guid>
{
    public string Name { get; set; }
    public string PartnerCategoryCode { get; set; }
    public string Description { get; set; }
    public bool IsDisplayOnApp { get; set; }
    public string Image { get; set; }
    public ProductCategoryStatus Status { get; set; }
    public Guid? ParentCategoryId { get; set; }
    public ProductCategory ParentCategory { get; set; }
    public ICollection<ProductCategory> ChildCategories { get; set; } = new List<ProductCategory>();
    public ICollection<Product> Products { get; set; } = new List<Product>();
}
