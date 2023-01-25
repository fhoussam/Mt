using MediatR;
using Microsoft.EntityFrameworkCore;
using Mt.Application.Exceptions;
using Mt.Application.Operations.Queries.ResponseDtos;
using Mt.Application.Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetOrderByIdForEditQuery : IRequest<OrderForEditResponseDto>
    {
        public int Id { get; set; }

        public GetOrderByIdForEditQuery(int id)
        {
            Id = id;
        }

        public class GetOrdersByIdQueryHandler : IRequestHandler<GetOrderByIdForEditQuery, OrderForEditResponseDto>
        {
            private readonly INorthWindDbContext _context;

            public GetOrdersByIdQueryHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<OrderForEditResponseDto> Handle(GetOrderByIdForEditQuery request, CancellationToken cancellationToken)
            {
                var rawCustomer = await _context
                    .Orders
                    .Include(x => x.Customer)
                    .FirstOrDefaultAsync(x => x.OrderId == request.Id);

                if (rawCustomer == null)
                    throw new NotFoundException();

                var result = new OrderForEditResponseDto()
                {
                    OrderId = rawCustomer.OrderId,
                    CustomerId = rawCustomer.CustomerId,
                    EmployeeId = rawCustomer.EmployeeId,
                    OrderDate = rawCustomer.OrderDate,
                    ShipCountry = rawCustomer.ShipCountry,
                    ShipAddress = rawCustomer.ShipAddress
                };

                return result;
            }
        }
    }
}
