using HopTri.Domain.Entities.Features.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HopTri.Infrastructure.Data.Configurations.Features.Products;
public class ProductSpecificationsConfiguration : IEntityTypeConfiguration<ProductSpecifications>
{
    public void Configure(EntityTypeBuilder<ProductSpecifications> builder)
    {
        builder.HasKey(ps => ps.Id);
        builder.Property(ps => ps.Quantity).IsRequired();

        builder.HasOne(ps => ps.Product).WithMany(p => p.Specifications).HasForeignKey(ps => ps.ProductId);
        builder.HasOne(ps => ps.Unit).WithMany(pu => pu.Specifications).HasForeignKey(ps => ps.UnitId);
    }
}
