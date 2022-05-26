using MediatR;
using Mt.Application.Operations.Commands.RequestDtos;
using Mt.Application.Persistence;
using Mt.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Commands
{
    public class EditCustomerCommand :IRequest<Unit>
    {
        public EditCustomerCommand(string id, EditCustomerRequestDto customerValues)
        {
            Id = id;
            CustomerValues = customerValues;
        }

        public string Id { get; set; }
        public EditCustomerRequestDto CustomerValues { get; set; }

        public class EditCustomerCommandHandler : IRequestHandler<EditCustomerCommand, Unit>
        {
            private readonly INorthWindDbContext _context;

            public EditCustomerCommandHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(EditCustomerCommand request, CancellationToken cancellationToken)
            {
                if (string.IsNullOrEmpty(request.Id))
                {
                    var toEdit = _context.Customers.Find(request.Id);
                    toEdit.EditCustomer
                    (
                        request.CustomerValues.CompanyName, 
                        request.CustomerValues.City, 
                        request.CustomerValues.Country, 
                        request.CustomerValues.PostalCode,
                        request.CustomerValues.ContactName
                    );
                    _context.Customers.Update(toEdit);
                }

                else
                {
                    var toAdd = Customer.CreateCustomer
                    (
                        request.CustomerValues.CompanyName,
                        request.CustomerValues.City,
                        request.CustomerValues.Country,
                        request.CustomerValues.PostalCode,
                        request.CustomerValues.ContactName
                    );
                    await _context.Customers.AddAsync(toAdd);
                }

                return Unit.Value;
            }
        }
    }
}
