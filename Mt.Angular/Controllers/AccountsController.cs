
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace Mt.Api.Controllers
{
    public class AccountsController : Controller
    {
        //[Authorize]
        //apprenelty old authorize doest inject RedirectUri when auto challenging oidc scheme,
        //so you have to use a traditional Challenge instruction
        public IActionResult Index(string redirect)
        {
            if(User?.Identity?.IsAuthenticated != true)
                return Challenge(new AuthenticationProperties() { RedirectUri = $"/Accounts?redirect={redirect}" }, "oidc");

            string path;

            switch (redirect)
            {
                case "customers":
                    path = "/customers";
                    break;

                case "orders":
                    path = "/orders";
                    break;

                default:
                    path = "/";
                    break;
            }
            return Redirect(path);
        }
    }
}
