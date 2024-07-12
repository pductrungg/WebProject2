using HopTri.Domain.Entities.Features.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HopTri.Infrastructure.Data.Configurations.Features.Products;
public class ProductCategoryConfiguration : IEntityTypeConfiguration<ProductCategory>
{
    public void Configure(EntityTypeBuilder<ProductCategory> builder)
    {
        builder.Property(t => t.ParentCategoryId).HasDefaultValue(null);

        builder.HasKey(e => e.Id);
        builder.HasOne(e => e.ParentCategory)
                  .WithMany(p => p.ChildCategories)
                  .HasForeignKey(e => e.ParentCategoryId)
                  .OnDelete(DeleteBehavior.Restrict);
    }
}
