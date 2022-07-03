using MediatR;
using Mt.Application.Operations.Commands.RequestDtos;
using Mt.Application.Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetCustomersByIdForEditQuery : IRequest<EditCustomerRequestDto>
    {
        public string Id { get; set; }

        public GetCustomersByIdForEditQuery(string id)
        {
            Id = id;
        }

        public class GetCustomersByIdForEditQueryHandler : IRequestHandler<GetCustomersByIdForEditQuery, EditCustomerRequestDto>
        {
            private readonly INorthWindDbContext _context;

            public GetCustomersByIdForEditQueryHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<EditCustomerRequestDto> Handle(GetCustomersByIdForEditQuery request, CancellationToken cancellationToken)
            {
                var rawCustomer = await _context.Customers.FindAsync(request.Id);
                var result = new EditCustomerRequestDto() 
                {
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
