using MediatR;
using Mt.Application.Exceptions;
using Mt.Application.Operations.Commands.RequestDtos;
using Mt.Application.Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Commands
{
    public class EditOrderCommand : IRequest<Unit>
    {
        public EditOrderCommand(int orderId, EditOrderRequestDto orderValues)
        {
            OrderId = orderId;
            OrderValues = orderValues;
        }

        public EditOrderRequestDto OrderValues { get; set; }
        public int OrderId { get; set; }

        public class EditOrderCommandHandler : IRequestHandler<EditOrderCommand, Unit>
        {
            private readonly INorthWindDbContext _context;

            public EditOrderCommandHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(EditOrderCommand request, CancellationToken cancellationToken)
            {
                var toEdit = _context.Orders.Find(request.OrderId);

                if (toEdit == null)
                    throw new NotFoundException();

                toEdit.EditOrder
                (
                    request.OrderValues.EmployeeId,
                    request.OrderValues.CustomerId,
                    request.OrderValues.OrderDate,
                    request.OrderValues.ShipCountry,
                    request.OrderValues.ShipAddress
                );

                _context.Orders.Update(toEdit);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
