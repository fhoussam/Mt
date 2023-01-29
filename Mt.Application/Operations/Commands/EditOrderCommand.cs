using MediatR;
using Mt.Application.Exceptions;
using Mt.Application.Operations.Commands.RequestDtos;
using Mt.Application.Operations.Queries;
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

            private readonly IMediator _mediator;

            public EditOrderCommandHandler(INorthWindDbContext context, IMediator mediator)
            {
                _context = context;
                _mediator = mediator;
            }

            public async Task<Unit> Handle(EditOrderCommand request, CancellationToken cancellationToken)
            {
                //System.Threading.Thread.Sleep(1500);
                throw new System.Exception();

                var toEdit = _context.Orders.Find(request.OrderId);

                if (toEdit == null)
                    throw new NotFoundException();

                var experiencedQuery = new GetEmployeeExperiencedQuery() 
                { 
                    CustomerId = request.OrderValues.CustomerId,
                    EmployeeId = request.OrderValues.EmployeeId
                };

                var experienced = await _mediator.Send(experiencedQuery);

                if (!experienced)
                    throw new InvalidInputException("employee not experienced enough to perform this order");

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
