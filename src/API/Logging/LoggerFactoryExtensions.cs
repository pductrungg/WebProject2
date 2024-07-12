using System.Reflection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Serilog;

namespace HopTri.API.Logging;

public static class LoggerFactoryExtensions
{
    const string MessageTemplate = "{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level}] {Message} LogProperties={Properties}{NewLine}{Exception}";

    public static void AddFileSerilog(this ILoggerFactory loggerFactory, IConfiguration configuration, string contentRootPath)
    {
        var loggerBuilder = AddCommonLoggerConfiguration(configuration);

        loggerBuilder
            .WriteTo.File(path: Path.Combine($"{contentRootPath}\\logs", "log-.txt"),
            rollingInterval: RollingInterval.Day,
            outputTemplate: MessageTemplate)
            .WriteTo.Console(outputTemplate: MessageTemplate);

        Log.Logger = loggerBuilder.CreateLogger();
        loggerFactory.AddSerilog();
    }

    private static LoggerConfiguration AddCommonLoggerConfiguration(IConfiguration configuration)
        => new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .Enrich.FromLogContext()
                //.Enrich.WithExceptionDetails()
                .Filter.ByExcluding(c => c.Properties.Any(p => p.Value.ToString().Contains("/liveness")))
                .Filter.ByExcluding(c => c.Properties.Any(p => p.Value.ToString().Contains("/hc")))
                .Filter.ByExcluding(c => c.Properties.Any(p => p.Value.ToString().Contains("/swagger")))
                .Filter.ByExcluding(c => c.Properties.Any(p => p.Value.ToString().Contains("/health")));
}
