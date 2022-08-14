using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Mt.Application.Exceptions;
using System;
using System.IO;
using System.Text;
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
            catch (DbUpdateException e)
            {
                httpContext.Response.StatusCode = 400;
            }
            catch (InvalidInputException e)
            {
                httpContext.Response.StatusCode = 400;
                await WriteToResponse(e.Message);
            }
            catch (NotFoundException e)
            {
                httpContext.Response.StatusCode = 404;
                await WriteToResponse(e.Message);
            }
            catch (Exception e)
            {
                httpContext.Response.StatusCode = 500;
                //log exception here
            }

            async Task WriteToResponse(string s)
            {
                var bytes = Encoding.UTF8.GetBytes(s);
                await httpContext.Response.Body.WriteAsync(bytes, 0, bytes.Length);
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
