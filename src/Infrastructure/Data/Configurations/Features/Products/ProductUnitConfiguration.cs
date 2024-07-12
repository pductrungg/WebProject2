using HopTri.Domain.Entities.Features.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HopTri.Infrastructure.Data.Configurations.Features.Products;
public class ProductUnitConfiguration : IEntityTypeConfiguration<ProductUnit>
{
    public void Configure(EntityTypeBuilder<ProductUnit> builder)
    {
        builder.HasKey(pu => pu.Id);

        builder.Property(pu => pu.Name).IsRequired().HasMaxLength(50);

        builder.HasMany(pu => pu.Products).WithOne(p => p.ProductUnit).HasForeignKey(p => p.UnitId);

        builder.HasMany(pu => pu.Specifications).WithOne(ps => ps.Unit).HasForeignKey(ps => ps.UnitId);
    }
}
