using System;

namespace Mt.Application.Operations.Commands.RequestDtos
{
    public class EditOrderRequestDto
    {
        public int EmployeeId { get; set; }
        public string CustomerId { get; set; }
        public DateTime? OrderDate { get; set; }
        public string ShipCountry { get; set; }
        public string ShipAddress { get; set; }
    }
}
