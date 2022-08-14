using MediatR;
using Microsoft.EntityFrameworkCore;
using Mt.Application.Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class CustomerExistingQuery : IRequest<bool>
    {
        public string Id { get; set; }

        public CustomerExistingQuery(string id)
        {
            Id = id;
        }

        public class CustomerExistingQueryHandler : IRequestHandler<CustomerExistingQuery, bool>
        {
            private readonly INorthWindDbContext _context;

            public CustomerExistingQueryHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(CustomerExistingQuery request, CancellationToken cancellationToken)
            {
                var exists = await _context.Customers.AnyAsync(x => x.CustomerId == request.Id);
                return exists;
            }
        }
    }
}
