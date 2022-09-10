using System;

namespace Mt.Application.Operations.Commands.RequestDtos
{
    public class EditOrderRequestDto
    {
        public string ContactName { get; set; }
        public int EmployeeId { get; set; }
        public int CustomerId { get; set; }
        public DateTime? OrderDate { get; set; }
        public string ShipCountry { get; set; }
    }
}
