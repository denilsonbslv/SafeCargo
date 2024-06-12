using Microsoft.AspNetCore.Builder;
using SafeCargo.Server.Middlewares;

namespace SafeCargo.Server.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseRequestLogging(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestLoggingMiddleware>();
        }
    }
}
