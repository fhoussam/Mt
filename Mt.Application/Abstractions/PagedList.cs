using System.Collections.Generic;

namespace Mt.Application.Abstractions
{
    public class PageList<T> where T : class
    {
        public IEnumerable<T> Content { get; set; }
        public int TotalCount { get; set; }
    }
}
