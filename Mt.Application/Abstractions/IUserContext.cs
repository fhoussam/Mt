namespace Mt.Application.Abstractions
{
    public interface IUserContext
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Language { get; set; }
    }
}
