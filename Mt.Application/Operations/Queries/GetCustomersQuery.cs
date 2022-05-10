using MediatR;
using Microsoft.EntityFrameworkCore;
using Mt.Application.Operations.Queries.ResponseDtos;
using Mt.Application.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetCustomersQuery : IRequest<IEnumerable<CustomerListItem>>
    {
        public class GetCustomersQueryHandler : IRequestHandler<GetCustomersQuery, IEnumerable<CustomerListItem>>
        {
            private readonly INorthWindDbContext _northWindDbContext;

            public GetCustomersQueryHandler(INorthWindDbContext northWindDbContext)
            {
                _northWindDbContext = northWindDbContext;
            }

            public async Task<IEnumerable<CustomerListItem>> Handle(GetCustomersQuery request, CancellationToken cancellationToken)
            {
                var result = await _northWindDbContext.Customers.Select(x => new CustomerListItem()
                { 
                    CompanyName = x.CompanyName,
                    ContactTitle = x.ContactTitle,
                    CustomerId = x.CustomerId,
                    ContactName = x.ContactName,
                    Country = x.Country
                }).Take(10).ToArrayAsync();

                return result;
            }
        }
    }
}
