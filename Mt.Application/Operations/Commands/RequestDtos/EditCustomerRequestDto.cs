namespace Mt.Application.Operations.Commands.RequestDtos
{
    public class EditCustomerRequestDto
    {
        public string CustomerId { get; set; }
        public string CompanyName { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string ContactName { get; set; }
    }
}
