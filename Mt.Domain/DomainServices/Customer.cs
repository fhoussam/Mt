using Mt.Domain.Abstractions;
using System;
using System.Collections.Generic;

namespace Mt.Domain.Entities
{
    partial class Customer : ITimeTracked
    {
        public DateTime CreationDate { get; set; }
        public DateTime? ModificationDate { get; set; }
        public void EditCustomer(
            string companyName,
            string city,
            string country,
            string postalCode,
            string contactName)
        {
            CompanyName = companyName;
            City = city;
            Country = country;
            PostalCode = postalCode;
            ContactName = contactName;
        }
        public static Customer CreateCustomer(
            string customerId,
            string companyName,
            string city,
            string country,
            string postalCode,
            string contactName)
        {
            var customer = new Customer();
            customer.CustomerId = customerId;
            customer.CompanyName = companyName;
            customer.City = city;
            customer.Country = country;
            customer.PostalCode = postalCode;
            customer.ContactName = contactName;
            return customer;
        }
    }
}
