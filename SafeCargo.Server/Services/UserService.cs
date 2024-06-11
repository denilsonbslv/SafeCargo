using SafeCargo.Server.Interfaces;
using SafeCargo.Server.Models;
using SafeCargo.Server.Utilities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace SafeCargo.Server.Services
{
    /// <summary>
    /// Serviço para gerenciar operações de CRUD para a entidade User.
    /// </summary>
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserService> _logger;

        /// <summary>
        /// Construtor do UserService.
        /// </summary>
        /// <param name="userRepository">O repositório para acessar os dados dos usuários.</param>
        /// <param name="logger">O logger para logging de informações e erros.</param>
        public UserService(IUserRepository userRepository, ILogger<UserService> logger)
        {
            _userRepository = userRepository;
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
                return await _userRepository.GetAllUsersAsync();
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
                return await _userRepository.GetUserByIdAsync(id);
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
                return await _userRepository.GetUserByUsernameAsync(username);
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
                return await _userRepository.GetUsersByCodLevelAsync(codLevel);
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
                user.PasswordHash = PasswordHasher.HashPassword(user.PasswordHash);
                user.CreatedAt = DateTime.UtcNow;
                return await _userRepository.CreateUserAsync(user);
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
                if (!string.IsNullOrEmpty(user.PasswordHash))
                {
                    user.PasswordHash = PasswordHasher.HashPassword(user.PasswordHash);
                }
                user.UpdatedAt = DateTime.UtcNow;
                return await _userRepository.UpdateUserAsync(user);
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
                return await _userRepository.DeleteUserAsync(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting user.");
                throw;
            }
        }
    }
}
