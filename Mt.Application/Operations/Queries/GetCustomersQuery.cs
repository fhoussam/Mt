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
using Mt.SeedWork.LinqExrensions;

namespace Mt.Application.Operations.Queries
{
    public class GetCustomersQuery : IRequest<PageList<CustomerListItem>>, ISearch
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string SortField { get; set; }
        public bool? Desc { get; set; }
        public string City { get; set; }
        public string CompanyName { get; set; }
        public string Country { get; set; }
        public string CustomerId { get; set; }

        public class GetCustomersQueryHandler : IRequestHandler<GetCustomersQuery, PageList<CustomerListItem>>
        {
            private readonly INorthWindDbContext _northWindDbContext;

            public GetCustomersQueryHandler(INorthWindDbContext northWindDbContext)
            {
                _northWindDbContext = northWindDbContext;
            }

            public async Task<PageList<CustomerListItem>> Handle(GetCustomersQuery request, CancellationToken cancellationToken)
            {
                var sortFieldKnown = Enum.TryParse<CustomersSortFields>(request.SortField, true, out var parsedSortField);
                request.Desc = !sortFieldKnown ? true : request.Desc ?? false;
                Expression<Func<Customer, object>> sortExpression = sortFieldKnown ? getSortExpression(parsedSortField) : x => x.CreationDate;
                Expression<Func<Customer, bool>> whereExpression = x => true
                        && (x.City == request.City || string.IsNullOrEmpty(request.City))
                        && (x.Country == request.Country || string.IsNullOrEmpty(request.Country))
                        && (x.CompanyName.Contains(request.CompanyName) || string.IsNullOrEmpty(request.CompanyName))
                        && (x.CustomerId.StartsWith(request.CustomerId) || string.IsNullOrEmpty(request.CustomerId));

                var content = await _northWindDbContext
                    .Customers
                    .Where(whereExpression)
                    .OrderBy(sortExpression, request.Desc)
                    .Skip(request.PageIndex * request.PageSize).Take(request.PageSize)
                    .Select(x => new CustomerListItem()
                    {
                        CompanyName = x.CompanyName,
                        ContactTitle = x.ContactTitle,
                        CustomerId = x.CustomerId,
                        ContactName = x.ContactName,
                        Country = x.Country
                    })
                    .AsNoTracking()
                    .ToArrayAsync();

                var totalCount = await _northWindDbContext.Customers.Where(whereExpression).CountAsync();

                return new PageList<CustomerListItem>()
                {
                    Content = content,
                    TotalCount = totalCount
                };

                static Expression<Func<Customer, object>> getSortExpression(CustomersSortFields sortField)
                {
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

                    return expression;
                }
            }
        }
    }
}
