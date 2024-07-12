using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using HopTri.Share.CloudinaryService.Interfaces;
using HopTri.Share.CloudinaryService.Services;
using HopTri.Share.CloudinaryService.Settings;

namespace HopTri.Share.CloudinaryService;
public static class DependencyInjection
{
    public static IServiceCollection AddCloudinaryServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<CloudinaryOAuthApiSettings>(configuration.GetSection(nameof(CloudinaryOAuthApiSettings)));

        services.AddScoped<ICloudinaryUploadService, CloudinaryStorageDataService>();

        return services;
    }
}
