namespace Mt.Application.Abstractions
{
    public interface ISearch
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string SortField { get; set; }
        public bool? Desc { get; set; }
    }
}
