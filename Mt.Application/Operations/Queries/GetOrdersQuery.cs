using MediatR;
using Microsoft.EntityFrameworkCore;
using Mt.Application.Operations.Queries.ResponseDtos;
using Mt.Application.Persistence;
using Mt.Domain.Entities;
using Mt.SeedWork.LinqExrensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetOrdersQuery : IRequest<IEnumerable<OrderListItem>>
    {
        public GetOrdersQuery(DateTime? from, DateTime? to, string shipCountry)
        {
            From = from;
            To = to;
            ShipCountry = shipCountry;
        }

        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public string ShipCountry { get; set; }

        public class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, IEnumerable<OrderListItem>>
        {
            private readonly INorthWindDbContext _context;

            public GetOrdersQueryHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<OrderListItem>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
            {
                Expression<Func<Order, bool>> whereExpression = x => true;

                if (!string.IsNullOrEmpty(request.ShipCountry)) 
                    whereExpression = whereExpression.And(x => x.ShipCountry == request.ShipCountry);

                if (request.From.HasValue)
                    whereExpression = whereExpression.And(x => x.OrderDate >= request.From.Value);

                if (request.To.HasValue)
                    whereExpression = whereExpression.And(x => x.OrderDate <= request.To.Value);

                var result = await _context.Orders
                    .Where(x => x.ShipCountry == request.ShipCountry || string.IsNullOrEmpty(request.ShipCountry))
                    .Where(whereExpression)
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

                return result;
            }
        }
    }
}
