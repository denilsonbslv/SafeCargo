using System.Collections.Generic;

namespace SafeCargo.Server.Services
{
    /// <summary>
    /// Classe estática para armazenar as políticas de acesso carregadas do banco de dados.
    /// </summary>
    public static class AccessLevelPolicies
    {
        /// <summary>
        /// Dicionário contendo as políticas de acesso.
        /// </summary>
        public static Dictionary<string, List<string>> Policies { get; set; } = new Dictionary<string, List<string>>();
    }
}
