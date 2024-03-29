﻿using MediatR;
using Microsoft.EntityFrameworkCore;
using Mt.Application.Operations.Queries.ResponseDtos;
using Mt.Application.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetOrdersByCustomerIdQuery : IRequest<IEnumerable<OrderListByCustomerIdItem>>
    {
        public string CustomerId { get; set; }

        public GetOrdersByCustomerIdQuery(string customerId)
        {
            CustomerId = customerId;
        }

        public class GetOrdersByCustomerIdQueryHandler : IRequestHandler<GetOrdersByCustomerIdQuery, IEnumerable<OrderListByCustomerIdItem>>
        {
            private readonly INorthWindDbContext _context;

            public GetOrdersByCustomerIdQueryHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<OrderListByCustomerIdItem>> Handle(GetOrdersByCustomerIdQuery request, CancellationToken cancellationToken)
            {
                var result = await _context.Orders.Where(x => x.CustomerId == request.CustomerId)
                    .Include(x => x.OrderDetails)
                    .Include(x => x.Customer)
                    .Select(x => new OrderListByCustomerIdItem() 
                    {
                        Id = x.OrderId,
                        ContactName = x.Customer.ContactName,
                        OrderDate = x.OrderDate,
                        ProductsCount = x.OrderDetails.Count
                    })
                    .AsNoTracking()
                    .ToListAsync();

                return result;
            }
        }
    }
}
