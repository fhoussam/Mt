using MediatR;
using Microsoft.EntityFrameworkCore;
using Mt.Application.Abstractions;
using Mt.Application.Operations.Queries.ResponseDtos;
using Mt.Application.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetCustomersQuery : IRequest<PageList<CustomerListItem>>, IPager
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }

        public class GetCustomersQueryHandler : IRequestHandler<GetCustomersQuery, PageList<CustomerListItem>>
        {
            private readonly INorthWindDbContext _northWindDbContext;

            public GetCustomersQueryHandler(INorthWindDbContext northWindDbContext)
            {
                _northWindDbContext = northWindDbContext;
            }

            public async Task<PageList<CustomerListItem>> Handle(GetCustomersQuery request, CancellationToken cancellationToken)
            {
                var content = await _northWindDbContext
                    .Customers
                    .Skip(request.PageIndex * request.PageSize).Take(request.PageSize)
                    .OrderByDescending(x => x.CreationDate)
                    .Select(x => new CustomerListItem()
                    {
                        CompanyName = x.CompanyName,
                        ContactTitle = x.ContactTitle,
                        CustomerId = x.CustomerId,
                        ContactName = x.ContactName,
                        Country = x.Country
                    })
                .ToArrayAsync();

                var totalCount = await _northWindDbContext.Customers.CountAsync();

                return new PageList<CustomerListItem>()
                {
                    Content = content,
                    TotalCount = totalCount
                };
            }
        }
    }
}
