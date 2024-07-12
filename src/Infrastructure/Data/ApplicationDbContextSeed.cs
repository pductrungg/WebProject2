using HopTri.Domain.Entities.Features.Products;
using Microsoft.Extensions.DependencyInjection;

namespace HopTri.Infrastructure.Data;
public static class ApplicationDbContextSeed
{
    public static async Task SeedProductUnitAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var services = scope.ServiceProvider;
     
        try
        {
            var context = services.GetRequiredService<ApplicationDbContext>();
            if (!context.ProductUnits.Any())
            {
                var productUnits = new List<ProductUnit>() {
                                    new ProductUnit { Name = "g" },
                                    new ProductUnit { Name = "kg" },
                                    new ProductUnit { Name = "l" },
                                    new ProductUnit { Name = "ml" },
                                    new ProductUnit { Name = "cái" },
                                    new ProductUnit { Name = "hộp" },
                                    new ProductUnit { Name = "gói" },
                                    new ProductUnit { Name = "tá" },
                                    new ProductUnit { Name = "chai" },
                                    new ProductUnit { Name = "lon" },
                                    new ProductUnit { Name = "gói nhỏ" },
                                    new ProductUnit { Name = "gói lớn" }
                };

                await context.ProductUnits.AddRangeAsync(productUnits);
                await context.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            //TODO
        }
    }
}
