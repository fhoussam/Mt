using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Mt.Api.Middlewares
{
    public class CustomExceptionHandler
    {
        private readonly RequestDelegate _next;

        public CustomExceptionHandler(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (NotFoundException)
            {
                httpContext.Response.StatusCode = 404;
            }
            catch (DbUpdateException)
            {
                httpContext.Response.StatusCode = 400;
            }
            catch (Exception e)
            { 
                //log exception here
            }
        }
    }

    public static class ExcptionHandlerExtensions
    {
        public static IApplicationBuilder UseCustomExcptionHandler(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CustomExceptionHandler>();
        }
    }
}
