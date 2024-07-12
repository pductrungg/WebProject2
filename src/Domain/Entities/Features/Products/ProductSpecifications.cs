namespace HopTri.Domain.Entities.Features.Products;
public class ProductSpecifications : BaseAuditableEntity<Guid>
{
    public Guid ProductId { get; set; }
    public Guid UnitId { get; set; }
    public decimal Quantity { get; set; }

    public Product Product { get; set; }
    public ProductUnit Unit { get; set; }
}
