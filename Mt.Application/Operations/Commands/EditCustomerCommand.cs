using MediatR;
using Mt.Application.Exceptions;
using Mt.Application.Operations.Commands.RequestDtos;
using Mt.Application.Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Commands
{
    public class EditCustomerCommand :IRequest<Unit>
    {
        public EditCustomerCommand(string customerId, EditCustomerRequestDto customerValues)
        {
            CustomerId = customerId;
            CustomerValues = customerValues;
        }

        public EditCustomerRequestDto CustomerValues { get; set; }
        public string CustomerId { get; set; }

        public class EditCustomerCommandHandler : IRequestHandler<EditCustomerCommand, Unit>
        {
            private readonly INorthWindDbContext _context;

            public EditCustomerCommandHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(EditCustomerCommand request, CancellationToken cancellationToken)
            {
                var toEdit = _context.Customers.Find(request.CustomerId);

                if (toEdit == null)
                    throw new NotFoundException("customer not found");

                toEdit.EditCustomer
                (
                    request.CustomerValues.CompanyName,
                    request.CustomerValues.City,
                    request.CustomerValues.Country,
                    request.CustomerValues.PostalCode,
                    request.CustomerValues.ContactName
                );

                _context.Customers.Update(toEdit);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
