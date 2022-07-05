using MediatR;
using Mt.Application.Operations.Commands.RequestDtos;
using Mt.Application.Persistence;
using Mt.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Commands
{
    public class AddCustomerCommand : IRequest<Unit>
    {
        public AddCustomerCommand(AddCustomerRequestDto customerValues)
        {
            CustomerValues = customerValues;
        }

        public AddCustomerRequestDto CustomerValues { get; set; }

        public class AddCustomerCommandHandler : IRequestHandler<AddCustomerCommand, Unit>
        {
            private readonly INorthWindDbContext _context;

            public AddCustomerCommandHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(AddCustomerCommand request, CancellationToken cancellationToken)
            {
                var toAdd = Customer.CreateCustomer
                (
                    request.CustomerValues.CustomerId,
                    request.CustomerValues.CompanyName,
                    request.CustomerValues.City,
                    request.CustomerValues.Country,
                    request.CustomerValues.PostalCode,
                    request.CustomerValues.ContactName
                );

                await _context.Customers.AddAsync(toAdd);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
