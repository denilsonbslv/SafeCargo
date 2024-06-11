using SafeCargo.Server.Models;
using SafeCargo.Server.Data;
using SafeCargo.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace SafeCargo.Server.Repositories
{
    /// <summary>
    /// Repositório para gerenciar operações de CRUD para a entidade AccessLevel.
    /// </summary>
    public class AccessLevelRepository : IAccessLevelRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AccessLevelRepository> _logger;

        /// <summary>
        /// Construtor do AccessLevelRepository.
        /// </summary>
        /// <param name="context">O contexto do banco de dados.</param>
        /// <param name="logger">O logger para logging de informações e erros.</param>
        public AccessLevelRepository(ApplicationDbContext context, ILogger<AccessLevelRepository> logger)
        {
            _context = context;
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
                return await _context.AccessLevels.ToListAsync();
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
        public async Task<AccessLevel> GetAccessLevelByCodLevelAsync(string codLevel)
        {
            try
            {
                return await _context.AccessLevels.FindAsync(codLevel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting access level by codLevel: {CodLevel}", codLevel);
                throw;
            }
        }

        /// <summary>
        /// Cria um nível de acesso.
        /// </summary>
        /// <param name="accessLevel">O nível de acesso a ser criado.</param>
        /// <returns>O nível de acesso criado.</returns>
        public async Task<AccessLevel> CreateAccessLevelAsync(AccessLevel accessLevel)
        {
            try
            {
                _context.AccessLevels.Add(accessLevel);
                await _context.SaveChangesAsync();
                return accessLevel;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating access level: {AccessLevel}", accessLevel);
                throw;
            }
        }

        /// <summary>
        /// Atualiza um nível de acesso.
        /// </summary>
        /// <returns>O nível de acesso atualizado.</returns>\
        public async Task<AccessLevel> UpdateAccessLevelAsync(AccessLevel accessLevel)
        {
            try
            {
                _context.AccessLevels.Update(accessLevel);
                await _context.SaveChangesAsync();
                return accessLevel;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating access level: {AccessLevel}", accessLevel);
                throw;
            }
        }


        /// <summary>
        /// Faz o soft delete de um nível de acesso.
        /// </summary>
        public async Task<AccessLevel> DeleteAccessLevelAsync(AccessLevel accessLevel)
        {
            try
            {
                accessLevel.DeletedAt = DateTime.UtcNow;
                _context.AccessLevels.Update(accessLevel);
                await _context.SaveChangesAsync();
                return accessLevel;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting access level: {AccessLevel}", accessLevel);
                throw;
            }
        }
    }
}
