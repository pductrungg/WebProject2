using HopTri.Domain.Entities.Features.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HopTri.Infrastructure.Data.Configurations.Features.Products;
public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name).IsRequired().HasMaxLength(255);
        builder.Property(p => p.Code).IsRequired().HasMaxLength(50);
        builder.Property(p => p.CommonCode).HasMaxLength(50);

        builder.HasOne(p => p.Category).WithMany(c => c.Products).HasForeignKey(p => p.CategoryId);
        builder.HasOne(p => p.ProductUnit).WithMany(u => u.Products).HasForeignKey(p => p.UnitId);
        builder.HasMany(p => p.ProductImages).WithOne(pi => pi.Product).HasForeignKey(pi => pi.ProductId);
        builder.HasMany(p => p.Specifications).WithOne(ps => ps.Product).HasForeignKey(ps => ps.ProductId);
    }
}
