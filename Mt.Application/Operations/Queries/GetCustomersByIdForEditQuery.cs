using MediatR;
using Mt.Application.Operations.Queries.ResponseDtos;
using Mt.Application.Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetCustomersByIdForEditQuery : IRequest<CustomerForEditResponseDto>
    {
        public string Id { get; set; }

        public GetCustomersByIdForEditQuery(string id)
        {
            Id = id;
        }

        public class GetCustomersByIdForEditQueryHandler : IRequestHandler<GetCustomersByIdForEditQuery, CustomerForEditResponseDto>
        {
            private readonly INorthWindDbContext _context;

            public GetCustomersByIdForEditQueryHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<CustomerForEditResponseDto> Handle(GetCustomersByIdForEditQuery request, CancellationToken cancellationToken)
            {
                var rawCustomer = await _context.Customers.FindAsync(request.Id);
                var result = new CustomerForEditResponseDto()
                {
                    CustomerId = rawCustomer.CustomerId,
                    CompanyName = rawCustomer.CompanyName,
                    City = rawCustomer.City,
                    Country = rawCustomer.Country,
                    PostalCode = rawCustomer.PostalCode,
                    ContactName = rawCustomer.ContactName,
                };

                return result;
            }
        }
    }
}
