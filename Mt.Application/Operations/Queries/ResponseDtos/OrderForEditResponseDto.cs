using System;

namespace Mt.Application.Operations.Queries.ResponseDtos
{
    public class OrderForEditResponseDto
    {
        public int OrderId { get; set; }
        public int? EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string CustomerId { get; set; }
        public DateTime? OrderDate { get; set; }
        public string ShipCountry { get; set; }
        public string ShipAddress { get; set; }
    }
}
