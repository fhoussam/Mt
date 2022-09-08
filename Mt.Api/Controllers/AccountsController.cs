using IdentityModel;
using IdentityModel.OidcClient;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Mt.Application.Operations.Queries.ResponseDtos;
using System.Linq;
using System.Threading.Tasks;

namespace Mt.Api.Controllers
{
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

            if (string.IsNullOrEmpty(accessToken))
                return NoContent();

            var result = await _oidcClient.GetUserInfoAsync(accessToken);
            var claimList = result.Claims.Select(x => new 
            { 
                x.Type,
                x.Value
            });

            var response = new UserResponseDto() 
            {
                Id = claimList.Single(x=> x.Type == JwtClaimTypes.Subject).Value,
                Name = claimList.Single(x => x.Type == JwtClaimTypes.Name).Value,
                Role = claimList.Single(x => x.Type == JwtClaimTypes.Role).Value,
            };

            return Ok(response);
        }
    }
}
