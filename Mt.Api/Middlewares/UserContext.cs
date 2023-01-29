using Mt.Application.Abstractions;

namespace Mt.Api.Middlewares
{
    public class UserContext : IUserContext
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Language { get; set; }
    }
}