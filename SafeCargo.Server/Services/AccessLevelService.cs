using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SafeCargo.Server.Interfaces;
using SafeCargo.Server.Models;

namespace SafeCargo.Server.Services
{
    /// <summary>
    /// Serviço para gerenciar operações de CRUD para a entidade AccessLevel.
    /// </summary>
    public class AccessLevelService : IAccessLevelService
    {
        private readonly IAccessLevelRepository _accessLevelRepository;
        private readonly ILogger<AccessLevelService> _logger;

        /// <summary>
        /// Construtor do AccessLevelService.
        /// </summary>
        /// <param name="accessLevelRepository">O repositório para acessar os dados dos níveis de acesso.</param>
        /// <param name="logger">O logger para logging de informações e erros.</param>
        public AccessLevelService(IAccessLevelRepository accessLevelRepository, ILogger<AccessLevelService> logger)
        {
            _accessLevelRepository = accessLevelRepository;
            _logger = logger;
        }

        /// <summary>
        /// Obtém todos os níveis de acesso.
        /// </summary>
        /// <returns>Uma lista de níveis de acesso.</returns>
        public async Task<IEnumerable<AccessLevel>> GetAllAccessLevelsAsync()
        {
            try
            {
                return await _accessLevelRepository.GetAllAccessLevelsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all access levels.");
                throw;
            }
        }

        /// <summary>
        /// Obtém um nível de acesso pelo seu código.
        /// </summary>
        /// <param name="codLevel">O código do nível de acesso.</param>
        /// <returns>O nível de acesso correspondente ao código.</returns>
        public async Task<AccessLevel> GetAccessLevelByCodAsync(string codLevel)
        {
            try
            {
                return await _accessLevelRepository.GetAccessLevelByCodLevelAsync(codLevel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting access level by code: {CodLevel}", codLevel);
                throw;
            }
        }

        /// <summary>
        /// Cria um novo nível de acesso.
        /// </summary>
        /// <param name="accessLevel">O nível de acesso a ser criado.</param>
        /// <returns>O nível de acesso criado.</returns>
        public async Task<AccessLevel> CreateAccessLevelAsync(AccessLevel accessLevel)
        {
            try
            {
                accessLevel.CreatedAt = DateTime.UtcNow;
                return await _accessLevelRepository.CreateAccessLevelAsync(accessLevel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating access level.");
                throw;
            }
        }

        /// <summary>
        /// Atualiza um nível de acesso existente.
        /// </summary>
        /// <param name="accessLevel">O nível de acesso a ser atualizado.</param>
        /// <returns>O nível de acesso atualizado.</returns>
        public async Task<AccessLevel> UpdateAccessLevelAsync(AccessLevel accessLevel)
        {
            try
            {
                accessLevel.UpdatedAt = DateTime.UtcNow;
                return await _accessLevelRepository.UpdateAccessLevelAsync(accessLevel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating access level.");
                throw;
            }
        }

        /// <summary>
        /// Exclui um nível de acesso existente.
        /// </summary>
        /// <param name="codLevel">O código do nível de acesso a ser excluído.</param>
        /// <returns>True se o nível de acesso foi excluído, caso contrário, false.</returns>
        public async Task<bool> DeleteAccessLevelAsync(string codLevel)
        {
            try
            {
                var accessLevel = await _accessLevelRepository.GetAccessLevelByCodLevelAsync(codLevel);
                if (accessLevel == null)
                {
                    _logger.LogWarning("Access level not found: {CodLevel}", codLevel);
                    return false;
                }

                var result = await _accessLevelRepository.DeleteAccessLevelAsync(accessLevel);
                return result != null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting access level.");
                throw;
            }
        }
    }
}
