using MediatR;
using Mt.Application.Operations.Queries.ResponseDtos;
using Mt.Application.Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetCustomersByIdQuery : IRequest<CustomerDetail>
    {
        public string Id { get; set; }

        public GetCustomersByIdQuery(string id)
        {
            Id = id;
        }

        public class GetCustomersByIdQueryHandler : IRequestHandler<GetCustomersByIdQuery, CustomerDetail>
        {
            private readonly INorthWindDbContext _context;

            public GetCustomersByIdQueryHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<CustomerDetail> Handle(GetCustomersByIdQuery request, CancellationToken cancellationToken)
            {
                var rawCustomer = await _context.Customers.FindAsync(request.Id);
                var result = new CustomerDetail()
                {
                    CompanyName = rawCustomer.CompanyName,
                    ContactName = rawCustomer.ContactName,
                    ContactTitle = rawCustomer.ContactTitle,
                    Address = rawCustomer.Address,
                    City = rawCustomer.City,
                    PostalCode = rawCustomer.PostalCode,
                    Country = rawCustomer.Country,
                    Phone = rawCustomer.Phone,
                    Fax = rawCustomer.Fax,
                };

                return result;
            }
        }
    }
}
