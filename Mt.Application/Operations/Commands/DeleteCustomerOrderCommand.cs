using MediatR;
using Mt.Application.Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Commands
{
    public class DeleteCustomerOrderCommand : IRequest<Unit>
    {
        public DeleteCustomerOrderCommand(string customerId, int orderId)
        {
            CustomerId = customerId;
            OrderId = orderId;
        }

        public string CustomerId { get; set; }
        public int OrderId { get; set; }

        public class DeleteCustomerOrderCommandHandler : IRequestHandler<DeleteCustomerOrderCommand, Unit>
        {
            private readonly INorthWindDbContext _context;

            public DeleteCustomerOrderCommandHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteCustomerOrderCommand request, CancellationToken cancellationToken)
            {
                var toDelete = _context.Orders.FirstOrDefault(x=> x.CustomerId == request.CustomerId && x.OrderId == request.OrderId);

                if (toDelete != null)
                {
                    _context.Orders.Remove(toDelete);
                    await _context.SaveChangesAsync();
                    return Unit.Value;
                }
                else
                    throw new System.Exception();
            }
        }
    }
}
