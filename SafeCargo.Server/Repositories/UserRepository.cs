using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SafeCargo.Server.Data;
using SafeCargo.Server.Interfaces;
using SafeCargo.Server.Models;

namespace SafeCargo.Server.Repositories
{
    /// <summary>
    /// Repositório para gerenciar operações de CRUD para a entidade User.
    /// </summary>
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UserRepository> _logger;

        /// <summary>
        /// Construtor do UserRepository.
        /// </summary>
        /// <param name="context">O contexto do banco de dados.</param>
        /// <param name="logger">O logger para logging de informações e erros.</param>
        public UserRepository(ApplicationDbContext context, ILogger<UserRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Obtém todos os usuários.
        /// </summary>
        /// <returns>Uma lista de usuários.</returns>
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            try
            {
                return await _context.Users.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all users.");
                throw;
            }
        }

        /// <summary>
        /// Obtém um usuário pelo seu ID.
        /// </summary>
        /// <param name="id">O ID do usuário.</param>
        /// <returns>O usuário correspondente ao ID.</returns>
        public async Task<User> GetUserByIdAsync(int id)
        {
            try
            {
                return await _context.Users.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user by ID: {Id}", id);
                throw;
            }
        }

        /// <summary>
        /// Obtém um usuário pelo seu nome de usuário.
        /// </summary>
        /// <param name="username">O nome de usuário.</param>
        /// <returns>O usuário correspondente ao nome de usuário.</returns>
        public async Task<User> GetUserByUsernameAsync(string username)
        {
            try
            {
                return await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user by username: {Username}", username);
                throw;
            }
        }

        /// <summary>
        /// Obtém uma lista de usuários pelo seu código de nível de acesso.
        /// </summary>
        /// <param name="codLevel">O código de nível de acesso.</param>
        /// <returns>Uma lista de usuários correspondentes ao código de nível de acesso.</returns>
        public async Task<List<User>> GetUsersByCodLevelAsync(string codLevel)
        {
            try
            {
                return await _context.Users.Where(u => u.CodLevel == codLevel).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting users by codLevel: {CodLevel}", codLevel);
                throw;
            }
        }

        /// <summary>
        /// Cria um novo usuário.
        /// </summary>
        /// <param name="user">O usuário a ser criado.</param>
        /// <returns>O usuário criado.</returns>
        public async Task<User> CreateUserAsync(User user)
        {
            try
            {
                user.CreatedAt = DateTime.UtcNow;
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating user.");
                throw;
            }
        }

        /// <summary>
        /// Atualiza um usuário existente.
        /// </summary>
        /// <param name="user">O usuário a ser atualizado.</param>
        /// <returns>O usuário atualizado.</returns>
        public async Task<User> UpdateUserAsync(User user)
        {
            try
            {
                user.UpdatedAt = DateTime.UtcNow;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user.");
                throw;
            }
        }

        /// <summary>
        /// Exclui um usuário existente.
        /// </summary>
        /// <param name="user">O usuário a ser excluído.</param>
        /// <returns>O usuário excluído.</returns>
        public async Task<User> DeleteUserAsync(User user)
        {
            try
            {
                user.DeletedAt = DateTime.UtcNow;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting user.");
                throw;
            }
        }
    }
}
