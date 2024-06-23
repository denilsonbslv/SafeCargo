using Microsoft.AspNetCore.Builder;
using SafeCargo.Server.Middlewares;

namespace SafeCargo.Server.Extensions
{
    public static class MiddlewareExtensions
    {
        /// <summary>
        /// Extensão para adicionar middleware de logging de requisições e JWT cookie middleware.
        /// </summary>
        /// <param name="builder">Construtor da aplicação.</param>
        /// <returns>Construtor da aplicação com middlewares configurados.</returns>
        public static IApplicationBuilder UseRequestLogging(this IApplicationBuilder builder)
        {
            // Adicionar JwtCookieMiddleware primeiro
            builder.UseMiddleware<JwtCookieMiddleware>();

            // Adicionar RequestLoggingMiddleware em seguida
            return builder.UseMiddleware<RequestLoggingMiddleware>();
        }
    }
}
