using System.Reflection;
using HopTri.Application.Common.Interfaces;
using HopTri.Domain.Common;
using HopTri.Domain.Entities.Features.Products;
using HopTri.Domain.Entities.Features.Users;
using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HopTri.Infrastructure.Data;

public class ApplicationDbContext :
    IdentityDbContext<ApplicationUser, ApplicationRole, string>,
    IApplicationDbContext,
    IDataProtectionKeyContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<DataProtectionKey> DataProtectionKeys => Set<DataProtectionKey>();
    public DbSet<ApplicationRole> AspNetRoles => Set<ApplicationRole>();
    public DbSet<ApplicationUser> AspNetUsers => Set<ApplicationUser>();
    public DbSet<ApplicationUserClaim> AspNetUserClaims => Set<ApplicationUserClaim>();
    public DbSet<ApplicationRoleClaim> AspNetRoleClaims => Set<ApplicationRoleClaim>();
    public DbSet<ApplicationUserRole> AspNetUserRoles => Set<ApplicationUserRole>();

    #region product
    public DbSet<ProductCategory> ProductCategories => Set<ProductCategory>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductImage> ProductImages => Set<ProductImage>();
    public DbSet<ProductSpecifications> ProductSpecifications => Set<ProductSpecifications>();
    public DbSet<ProductUnit> ProductUnits => Set<ProductUnit>();
    #endregion product

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<BaseAuditableEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedBy = "System";
                    entry.Entity.Created = DateTime.Now;
                    break;

                case EntityState.Modified:
                    entry.Entity.LastModifiedBy = "System";
                    entry.Entity.LastModified = DateTime.Now;
                    break;
            }
        }

        var result = await base.SaveChangesAsync(cancellationToken);
        return result;
    }


}
