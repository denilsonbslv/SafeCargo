using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SafeCargo.Server.DTOs;
using SafeCargo.Server.Interfaces;
using SafeCargo.Server.Models;
using SafeCargo.Server.Utilities;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SafeCargo.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Construtor do AuthController.
        /// </summary>
        /// <param name="userService">Serviço para gerenciamento de usuários.</param>
        /// <param name="configuration">Configurações da aplicação.</param>
        public AuthController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        /// <summary>
        /// Realiza o login de um usuário.
        /// </summary>
        /// <param name="loginDTO">Dados de login do usuário.</param>
        /// <returns>Token JWT e informações do usuário.</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var user = await _userService.GetUserByUsernameAsync(loginDTO.Username);
            if (user == null || !PasswordHasher.VerifyPassword(user.PasswordHash, loginDTO.Password))
            {
                return Unauthorized();
            }

            var token = TokenHelper.GenerateJwtToken(user, _configuration);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // Defina como true em produção
                SameSite = SameSiteMode.None,
            };
            Response.Cookies.Append("AuthToken", token, cookieOptions);

            var userDTO = new UserDTO
            {
                Id = user.Id,
                Username = user.Username,
                CodLevel = user.CodLevel,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                DeletedAt = user.DeletedAt
            };

            return Ok(new { User = userDTO });
        }

        /// <summary>
        /// Valida se um token JWT ainda é válido.
        /// </summary>
        /// <returns>True se o token for válido, caso contrário false.</returns>
        [HttpPost("validate-token")]
        public IActionResult ValidateToken()
        {
            if (!Request.Cookies.TryGetValue("AuthToken", out var token))
            {
                return BadRequest("Token é necessário.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                }, out SecurityToken validatedToken);

                return Ok(true);
            }
            catch
            {
                return Unauthorized();
            }
        }

        /// <summary>
        /// Atualiza um token JWT expirado.
        /// </summary>
        /// <returns>Novo token JWT.</returns>
        [HttpPost("refresh-token")]
        public IActionResult RefreshToken()
        {
            if (!Request.Cookies.TryGetValue("AuthToken", out var token))
            {
                return BadRequest("Token é necessário.");
            }

            var principal = TokenHelper.GetPrincipalFromExpiredToken(token, _configuration);
            if (principal == null)
            {
                return BadRequest("Token inválido.");
            }

            var newJwtToken = TokenHelper.GenerateJwtToken(new User
            {
                Username = principal.Identity.Name,
                CodLevel = principal.FindFirst(ClaimTypes.Role).Value
            }, _configuration);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // Defina como true em produção
                SameSite = SameSiteMode.None,
            };
            Response.Cookies.Append("AuthToken", newJwtToken, cookieOptions);

            return Ok(new { Token = newJwtToken });
        }

        /// <summary>
        /// Realiza o logout do usuário.
        /// </summary>
        /// <returns>Status 200 se o logout for bem-sucedido.</returns>
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("AuthToken");
            return Ok(new { message = "Logout bem-sucedido" });
        }
    }
}
