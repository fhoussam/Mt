using System;

namespace Mt.Application.Operations.Queries.ResponseDtos
{
    public class OrderListItem
    {
        public int Id { get; set; }
        public string ContactName { get; set; }
        public string Employee { get; set; }
        public DateTime? OrderDate { get; set; }
        public string ShipCountry { get; set; }
        public string CustomerId { get; set; }
        public int TotalOrderedUnits { get; set; }
    }
}
