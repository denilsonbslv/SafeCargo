using SafeCargo.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SafeCargo.Server.Interfaces
{
    /// <summary>
    /// Interface para o serviço de gerenciamento de usuários.
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Obtém todos os usuários.
        /// </summary>
        /// <returns>Uma lista de usuários.</returns>
        Task<IEnumerable<User>> GetAllUsersAsync();

        /// <summary>
        /// Obtém um usuário pelo seu ID.
        /// </summary>
        /// <param name="id">O ID do usuário.</param>
        /// <returns>O usuário correspondente ao ID.</returns>
        Task<User> GetUserByIdAsync(int id);

        /// <summary>
        /// Obtém um usuário pelo seu nome de usuário.
        /// </summary>
        /// <param name="username">O nome de usuário.</param>
        /// <returns>O usuário correspondente ao nome de usuário.</returns>
        Task<User> GetUserByUsernameAsync(string username);

        /// <summary>
        /// Obtém uma lista de usuários pelo seu código de nível de acesso.
        /// </summary>
        /// <param name="codLevel">O código de nível de acesso.</param>
        /// <returns>Uma lista de usuários correspondentes ao código de nível de acesso.</returns>
        Task<List<User>> GetUsersByCodLevelAsync(string codLevel);

        /// <summary>
        /// Cria um novo usuário.
        /// </summary>
        /// <param name="user">O usuário a ser criado.</param>
        /// <returns>O usuário criado.</returns>
        Task<User> CreateUserAsync(User user);

        /// <summary>
        /// Atualiza um usuário existente.
        /// </summary>
        /// <param name="user">O usuário a ser atualizado.</param>
        /// <returns>O usuário atualizado.</returns>
        Task<User> UpdateUserAsync(User user);

        /// <summary>
        /// Exclui um usuário existente.
        /// </summary>
        /// <param name="user">O usuário a ser excluído.</param>
        /// <returns>O usuário excluído.</returns>
        Task<User> DeleteUserAsync(User user);
    }
}
