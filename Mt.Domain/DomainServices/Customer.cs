﻿namespace Mt.Domain.Entities
{
    partial class Customer
    {
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
            string companyName,
            string city,
            string country,
            string postalCode,
            string contactName)
        {
            var customer = new Customer();
            customer.CompanyName = companyName;
            customer.City = city;
            customer.Country = country;
            customer.PostalCode = postalCode;
            customer.ContactName = contactName;
            return customer;
        }
    }
}
