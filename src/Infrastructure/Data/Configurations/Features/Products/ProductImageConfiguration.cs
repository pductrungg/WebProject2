using HopTri.Domain.Entities.Features.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HopTri.Infrastructure.Data.Configurations.Features.Products;
public class ProductImageConfiguration : IEntityTypeConfiguration<ProductImage>
{
    public void Configure(EntityTypeBuilder<ProductImage> builder)
    {
        builder.HasKey(pi => pi.Id);
        builder.Property(pi => pi.Name).IsRequired().HasMaxLength(255);
        builder.Property(pi => pi.Url).IsRequired().HasMaxLength(255);

        builder.HasOne(pi => pi.Product).WithMany(p => p.ProductImages).HasForeignKey(pi => pi.ProductId);
    }
}
