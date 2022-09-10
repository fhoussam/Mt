using Mt.Domain.Abstractions;
using System;

namespace Mt.Domain.Entities
{
    partial class Order : ITimeTracked
    {
        public DateTime CreationDate { get; set; }

        public DateTime? ModificationDate { get; set; }
        public void EditOrder(
            int employeeId,
            string customerId,
            DateTime? orderDate,
            string shipCountry,
            string shipAddress)
        {
            EmployeeId = employeeId;
            CustomerId = customerId;
            OrderDate = orderDate;
            ShipCountry = shipCountry;
            ShipAddress = shipAddress;
        }
    }
}
