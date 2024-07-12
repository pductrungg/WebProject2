namespace HopTri.Domain.Entities.Features.Products;
public class ProductImage : BaseAuditableEntity<Guid>
{
    public string Name { get; set; }
    public string Url { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; }
}
