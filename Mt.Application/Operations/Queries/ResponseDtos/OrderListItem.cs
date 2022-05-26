using System;

namespace Mt.Application.Operations.Queries.ResponseDtos
{
    public class OrderListItem
    {
        public string ContactName { get; set; }
        public DateTime? OrderDate { get; set; }
        public int ProductsCount { get; set; }
    }
}
