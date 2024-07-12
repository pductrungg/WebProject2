using HopTri.Domain.Entities.Features.Products;

namespace HopTri.Application.Common.Interfaces;
public interface IApplicationDbContext
{
    DbSet<ProductCategory> ProductCategories { get; }
    DbSet<Product> Products { get; }
    DbSet<ProductImage> ProductImages { get; }
    DbSet<ProductSpecifications> ProductSpecifications { get; }
    DbSet<ProductUnit> ProductUnits { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
