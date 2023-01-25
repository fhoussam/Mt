using FluentValidation;
using FluentValidation.AspNetCore;
using IdentityModel.OidcClient;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Mt.Api.Filters;
using Mt.Api.Middlewares;
using Mt.Application.Operations.Validators;
using Mt.Application.Persistence;
using Mt.Infra.Persistence;
using System.Text.Json.Serialization;

namespace Mt.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<INorthWindDbContext, NorthWindDbContext>(o => o.UseSqlServer(connectionString));

            services.AddMediatR();

            services.AddCors();

            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<EditCustomerValidator>();

            services
                .AddControllers(opts =>
                {
                    opts.Filters.Add(typeof(ValidateModelStateFilter));
                })
                .AddJsonOptions(opts =>
                {
                    var enumConverter = new JsonStringEnumConverter();
                    opts.JsonSerializerOptions.Converters.Add(enumConverter); 
                });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Mt.Api", Version = "v1" });
            });

            services.AddAuthentication("jwt")
                .AddJwtBearer("jwt", options =>
                {
                    options.Authority = "https://localhost:5001/";
                    options.Audience = "https://localhost:5001/resources";
                });

            var options = new OidcClientOptions()
            {
                Authority = "https://localhost:5001/",
                ClientId = "interactive",
                ClientSecret = "secret",
                Scope = "openid profile scope2 offline_access",
                RedirectUri = "/",
            };

            services.AddTransient(opt => new OidcClient(options));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Mt.Api v1"));
            }

            app.UseHttpsRedirection();

            app.UseCustomExcptionHandler();

            app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
