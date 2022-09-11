using MediatR;
using Microsoft.EntityFrameworkCore;
using Mt.Application.Abstractions;
using Mt.Application.Commons;
using Mt.Application.Operations.Queries.ResponseDtos;
using Mt.Application.Persistence;
using Mt.Domain.Entities;
using Mt.SeedWork.LinqExrensions;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetOrdersQuery : IRequest<PageList<OrderListItem>>, ISearch
    {
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public string ShipCountry { get; set; }
        public string CustomerId { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string SortField { get; set; }
        public bool? Desc { get; set; }

        public class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, PageList<OrderListItem>>
        {
            private readonly INorthWindDbContext _context;

            public GetOrdersQueryHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<PageList<OrderListItem>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
            {
                Expression<Func<Order, bool>> whereExpression = x => true;

                if (!string.IsNullOrEmpty(request.ShipCountry))
                    whereExpression = whereExpression.And(x => x.ShipCountry == request.ShipCountry);

                if (request.From.HasValue)
                    whereExpression = whereExpression.And(x => x.OrderDate >= request.From.Value);

                if (request.To.HasValue)
                    whereExpression = whereExpression.And(x => x.OrderDate <= request.To.Value);

                if (!string.IsNullOrEmpty(request.CustomerId))
                    whereExpression = whereExpression.And(x => x.CustomerId == request.CustomerId);

                var sortFieldKnown = Enum.TryParse<OrdersSortFields>(request.SortField, true, out var parsedSortField);
                request.Desc = !sortFieldKnown ? true : request.Desc ?? false;
                Expression<Func<Order, object>> sortExpression = sortFieldKnown ? getSortExpression(parsedSortField) : x => x.CreationDate;

                var content = await _context.Orders
                    .Where(whereExpression)
                    .OrderBy(sortExpression, request.Desc.Value)
                    .Skip(request.PageIndex * request.PageSize).Take(request.PageSize)
                    .Include(x => x.OrderDetails)
                    .Include(x => x.Customer)
                    .Select(x => new OrderListItem()
                    {
                        Id = x.OrderId,
                        ContactName = x.Customer.ContactName,
                        OrderDate = x.OrderDate,
                        TotalOrderedUnits = x.OrderDetails.Count,
                        Employee = $"{x.Employee.FirstName} {x.Employee.LastName}",
                        ShipCountry = x.ShipCountry
                    })
                    .AsNoTracking()
                    .ToListAsync();

                var totalCount = await _context.Orders.Where(whereExpression).CountAsync();

                return new PageList<OrderListItem>()
                {
                    Content = content,
                    TotalCount = totalCount
                };

                static Expression<Func<Order, object>> getSortExpression(OrdersSortFields sortField)
                {
                    Expression<Func<Order, object>> expression = x => x.CreationDate;

                    switch (sortField)
                    {
                        case OrdersSortFields.ContactName:
                            expression = x => x.Customer.ContactName;
                            break;
                        case OrdersSortFields.Employee:
                            expression = x => $"{x.Employee.FirstName} {x.Employee.LastName}";
                            break;
                        case OrdersSortFields.OrderDate:
                            expression = x => x.OrderDate;
                            break;
                        case OrdersSortFields.ShipCountry:
                            expression = x => x.ShipCountry;
                            break;
                        case OrdersSortFields.TotalOrderedUnits:
                            expression = x => x.OrderDetails.Count;
                            break;
                    }

                    return expression;
                }
            }
        }
    }
}