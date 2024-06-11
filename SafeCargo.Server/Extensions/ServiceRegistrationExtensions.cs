using Microsoft.Extensions.DependencyInjection;
using SafeCargo.Server.Interfaces;
using SafeCargo.Server.Repositories;
using SafeCargo.Server.Services;

namespace SafeCargo.Server.Extensions
{
    public static class ServiceRegistrationExtensions
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            // Add repositories
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAccessLevelRepository, AccessLevelRepository>();

            // Add services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAccessLevelService, AccessLevelService>();
        }
    }
}
