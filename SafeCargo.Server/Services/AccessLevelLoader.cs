using Microsoft.Extensions.DependencyInjection;
using SafeCargo.Server.Interfaces;
using SafeCargo.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SafeCargo.Server.Services
{
    public static class AccessLevelLoader
    {
        /// <summary>
        /// Carrega os níveis de acesso do banco de dados e armazena em AccessLevelPolicies.
        /// </summary>
        /// <param name="serviceProvider">Provedor de serviços para resolver dependências.</param>
        public static async Task LoadAccessLevels(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var accessLevelService = scope.ServiceProvider.GetRequiredService<IAccessLevelService>();
            var accessLevels = await accessLevelService.GetAllAccessLevelsAsync();

            var policies = new Dictionary<string, List<string>>();

            foreach (var accessLevel in accessLevels)
            {
                policies[accessLevel.CodLevel] = new List<string> { accessLevel.CodLevel };

                foreach (var otherLevel in accessLevels)
                {
                    if (otherLevel.CodLevel != accessLevel.CodLevel)
                    {
                        policies[accessLevel.CodLevel].Add(otherLevel.CodLevel);
                    }
                }
            }

            AccessLevelPolicies.Policies = policies;
        }
    }
}