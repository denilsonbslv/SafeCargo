using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SafeCargo.Server.Middlewares
{
    /// <summary>
    /// Middleware para validar e processar tokens JWT armazenados em cookies.
    /// </summary>
    public class JwtCookieMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Construtor do JwtCookieMiddleware.
        /// </summary>
        /// <param name="next">Próximo middleware na pipeline.</param>
        /// <param name="configuration">Configurações da aplicação.</param>
        public JwtCookieMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _configuration = configuration;
        }

        /// <summary>
        /// Método Invoke, responsável por processar a requisição HTTP e validar o token JWT.
        /// </summary>
        /// <param name="context">Contexto da requisição HTTP.</param>
        /// <returns>Uma tarefa que representa a execução do middleware.</returns>
        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Cookies.ContainsKey("AuthToken"))
            {
                var token = context.Request.Cookies["AuthToken"];
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
                        ClockSkew = TimeSpan.Zero
                    }, out SecurityToken validatedToken);

                    var jwtToken = (JwtSecurityToken)validatedToken;
                    var usernameClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name || x.Type == "unique_name");
                    var roleClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role || x.Type == "role");

                    if (usernameClaim != null && roleClaim != null)
                    {
                        var claims = new[]
                        {
                            new Claim(ClaimTypes.Name, usernameClaim.Value),
                            new Claim(ClaimTypes.Role, roleClaim.Value)
                        };
                        var identity = new ClaimsIdentity(claims, "Cookies");
                        context.User = new ClaimsPrincipal(identity);
                    }
                }
                catch
                {
                    // Token inválido, remove o cookie AuthToken
                    context.Response.Cookies.Delete("AuthToken");
                }
            }

            await _next(context);
        }
    }
}
