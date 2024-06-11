using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeCargo.Server.DTOs;
using SafeCargo.Server.Interfaces;
using SafeCargo.Server.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SafeCargo.Server.Controllers
{
    [Authorize] // Adiciona a política de autorização padrão para todos os métodos do controlador
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;

        /// <summary>
        /// Construtor do UserController.
        /// </summary>
        /// <param name="userService">O serviço para gerenciar usuários.</param>
        /// <param name="logger">O logger para logging de informações e erros.</param>
        public UserController(IUserService userService, ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        /// <summary>
        /// Obtém todos os usuários.
        /// </summary>
        /// <returns>Uma lista de usuários.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            var userDTOs = new List<UserDTO>();

            foreach (var user in users)
            {
                userDTOs.Add(new UserDTO
                {
                    Id = user.Id,
                    Username = user.Username,
                    CodLevel = user.CodLevel,
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt,
                    DeletedAt = user.DeletedAt
                });
            }

            return Ok(userDTOs);
        }

        /// <summary>
        /// Obtém um usuário pelo seu ID.
        /// </summary>
        /// <param name="id">O ID do usuário.</param>
        /// <returns>O usuário correspondente ao ID.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var userDTO = new UserDTO
            {
                Id = user.Id,
                Username = user.Username,
                CodLevel = user.CodLevel,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                DeletedAt = user.DeletedAt
            };

            return Ok(userDTO);
        }

        /// <summary>
        /// Obtém um usuário pelo seu nome de usuário.
        /// </summary>
        /// <param name="username">O nome de usuário.</param>
        /// <returns>O usuário correspondente ao nome de usuário.</returns>
        [HttpGet("username/{username}")]
        public async Task<ActionResult<UserDTO>> GetUserByUsername(string username)
        {
            var user = await _userService.GetUserByUsernameAsync(username);
            if (user == null)
            {
                return NotFound();
            }

            var userDTO = new UserDTO
            {
                Id = user.Id,
                Username = user.Username,
                CodLevel = user.CodLevel,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                DeletedAt = user.DeletedAt
            };

            return Ok(userDTO);
        }

        /// <summary>
        /// Cria um novo usuário.
        /// </summary>
        /// <param name="userCreateDTO">Os dados para criação do usuário.</param>
        /// <returns>O usuário criado.</returns>
        [HttpPost]
        public async Task<ActionResult<UserDTO>> CreateUser(UserCreateDTO userCreateDTO)
        {
            var user = new User
            {
                Username = userCreateDTO.Username,
                PasswordHash = userCreateDTO.Password, // Senha em texto plano
                CodLevel = userCreateDTO.CodLevel,
                CreatedAt = DateTime.UtcNow
            };

            var createdUser = await _userService.CreateUserAsync(user);

            var userDTO = new UserDTO
            {
                Id = createdUser.Id,
                Username = createdUser.Username,
                CodLevel = createdUser.CodLevel,
                CreatedAt = createdUser.CreatedAt,
                UpdatedAt = createdUser.UpdatedAt,
                DeletedAt = createdUser.DeletedAt
            };

            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, userDTO);
        }

        /// <summary>
        /// Atualiza um usuário existente.
        /// </summary>
        /// <param name="userUpdateDTO">Os dados atualizados do usuário.</param>
        /// <returns>O resultado da atualização.</returns>
        [HttpPut]
        public async Task<IActionResult> UpdateUser(UserUpdateDTO userUpdateDTO)
        {
            if (string.IsNullOrEmpty(userUpdateDTO.Id))
            {
                return BadRequest();
            }

            var user = await _userService.GetUserByIdAsync(Int32.Parse(userUpdateDTO.Id));
            if (user == null)
            {
                return NotFound();
            }

            user.Username = userUpdateDTO.Username;
            user.CodLevel = userUpdateDTO.CodLevel;
            user.UpdatedAt = DateTime.UtcNow;

            if (!string.IsNullOrEmpty(userUpdateDTO.Password))
            {
                user.PasswordHash = userUpdateDTO.Password; // Senha em texto plano
            }

            try
            {
                await _userService.UpdateUserAsync(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating user with ID: {Id}", userUpdateDTO.Id);
                throw;
            }

            return NoContent();
        }

        /// <summary>
        /// Exclui um usuário existente.
        /// </summary>
        /// <param name="id">O ID do usuário a ser excluído.</param>
        /// <returns>O resultado da exclusão.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _userService.DeleteUserAsync(user);

            return NoContent();
        }
    }
}
