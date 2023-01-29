using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Mt.Application.Abstractions;
using System.Net.Http;
using System.Threading.Tasks;

namespace Mt.Api.Middlewares
{
    public class UserContextMiddleware
    {
        private readonly RequestDelegate _next;

        public UserContextMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IUserContext userContext)
        {
            var acceptLanguage = context.Request.Headers.ContainsKey("accept-language") ?
                context.Request.Headers["accept-language"].ToString() : "en";

            userContext.Language = acceptLanguage;

            await _next(context);
        }
    }

    public static class UserContextExtensions
    {
        public static IApplicationBuilder UseUserContextMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UserContextMiddleware>();
        }
    }
}
