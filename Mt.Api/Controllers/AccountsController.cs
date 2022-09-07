using IdentityModel.OidcClient;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace Mt.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly OidcClient _oidcClient;

        public AccountsController(OidcClient oidcClient)
        {
            _oidcClient = oidcClient;
        }

        [HttpGet]
        [Route("user-info")]
        public async Task<IActionResult> Get()
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var result = await _oidcClient.GetUserInfoAsync(accessToken);
            var claimList = result.Claims.Select(x => new 
            { 
                x.Type,
                x.Value
            });
            return Ok(claimList);
        }
    }
}
