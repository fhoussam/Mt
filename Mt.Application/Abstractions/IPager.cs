namespace Mt.Application.Abstractions
{
    public interface IPager
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }
}
