
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;

namespace Mt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PingController : ControllerBase
    {
        private readonly IWebHostEnvironment env;

        public PingController(IWebHostEnvironment env)
        {
            this.env = env;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var isDev = env.IsDevelopment();
            return Ok($"BFF working, is dev : {isDev}");
        }
    }
}
