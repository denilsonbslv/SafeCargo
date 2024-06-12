using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using SafeCargo.Server.Services;

namespace SafeCargo.Server.Extensions
{
    /// <summary>
    /// Classe de extensão para adicionar políticas de autorização personalizadas.
    /// </summary>
    public static class AuthorizationServiceExtensions
    {
        /// <summary>
        /// Adiciona políticas de autorização personalizadas dinamicamente.
        /// </summary>
        /// <param name="services">A coleção de serviços para adicionar as políticas.</param>
        public static void AddCustomAuthorization(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                foreach (var policy in AccessLevelPolicies.Policies)
                {
                    options.AddPolicy(policy.Key, builder =>
                    {
                        builder.RequireRole(policy.Value.ToArray());
                    });
                }
            });
        }
    }
}
