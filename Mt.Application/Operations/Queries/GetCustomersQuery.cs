using MediatR;
using Microsoft.EntityFrameworkCore;
using Mt.Application.Abstractions;
using Mt.Application.Commons;
using Mt.Application.Operations.Queries.ResponseDtos;
using Mt.Application.Persistence;
using Mt.Domain.Entities;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetCustomersQuery : IRequest<PageList<CustomerListItem>>, ISearch
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string SortField { get; set; }
        public bool? Desc { get; set; }

        public class GetCustomersQueryHandler : IRequestHandler<GetCustomersQuery, PageList<CustomerListItem>>
        {
            private readonly INorthWindDbContext _northWindDbContext;

            public GetCustomersQueryHandler(INorthWindDbContext northWindDbContext)
            {
                _northWindDbContext = northWindDbContext;
            }

            public async Task<PageList<CustomerListItem>> Handle(GetCustomersQuery request, CancellationToken cancellationToken)
            {
                if (!Enum.TryParse<CustomersSortFields>(request.SortField, true, out var sortField))
                    sortField = CustomersSortFields.Unknown;

                request.Desc = request.Desc ?? false;

                Expression<Func<Customer, object>> expression = x => x.CreationDate;

                switch (sortField)
                {
                    case CustomersSortFields.CompanyName:
                        expression = x => x.CompanyName;
                        break;
                    case CustomersSortFields.ContactTitle:
                        expression = x => x.ContactTitle;
                        break;
                    case CustomersSortFields.CustomerId:
                        expression = x => x.CustomerId;
                        break;
                    case CustomersSortFields.ContactName:
                        expression = x => x.ContactName;
                        break;
                    case CustomersSortFields.Country:
                        expression = x => x.Country;
                        break;
                }

                var query = _northWindDbContext
                    .Customers
                    .OrderBy(expression, request.Desc.Value)
                    .Skip(request.PageIndex * request.PageSize).Take(request.PageSize);

                var content = await query.Select(x => new CustomerListItem()
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
