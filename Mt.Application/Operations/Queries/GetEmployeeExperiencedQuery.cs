﻿using MediatR;
using Microsoft.EntityFrameworkCore;
using Mt.Application.Exceptions;
using Mt.Application.Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetEmployeeExperiencedQuery : IRequest<bool>
    {
        public int EmployeeId { get; set; }
        public string CustomerId { get; set; }

        public class GetEmployeeExperiencedQueryHandler : IRequestHandler<GetEmployeeExperiencedQuery, bool>
        {
            private readonly INorthWindDbContext _context;

            public GetEmployeeExperiencedQueryHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(GetEmployeeExperiencedQuery request, CancellationToken cancellationToken)
            {
                var employee = await _context.Employees.FindAsync(request.EmployeeId);

                if (employee == null)
                    throw new InvalidInputException("invaild employee");

                var customer = await _context.Customers.FindAsync(request.CustomerId);

                if (customer == null)
                    throw new InvalidInputException("invaild customer");

                var employeeOrderCount = await _context
                    .Orders
                    .CountAsync(x => x.EmployeeId == request.EmployeeId);

                var customerOrderCount = await _context
                    .Orders
                    .CountAsync(x => x.CustomerId == request.CustomerId);

                if (customerOrderCount >= 20)
                    return employeeOrderCount >= 80;

                return true;
            }
        }
    }
}
