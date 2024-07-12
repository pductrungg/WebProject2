namespace HopTri.Domain.Entities.Features.Products;
public class ProductUnit: BaseEntity<Guid>
{
    public string Name { get; set; }

    public ICollection<Product> Products { get; set; }
    public ICollection<ProductSpecifications> Specifications { get; set; }
}
