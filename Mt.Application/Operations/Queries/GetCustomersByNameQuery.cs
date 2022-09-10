using MediatR;
using Microsoft.EntityFrameworkCore;
using Mt.Application.Operations.Queries.ResponseDtos;
using Mt.Application.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetCustomersByNameQuery : IRequest<IEnumerable<OptionResponseDto<string>>>
    {
        public string Name { get; set; }

        public GetCustomersByNameQuery(string contactName)
        {
            Name = contactName;
        }

        public class GetCustomersByNameQueryHandler : IRequestHandler<GetCustomersByNameQuery, IEnumerable<OptionResponseDto<string>>>
        {
            private readonly INorthWindDbContext _context;

            public GetCustomersByNameQueryHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<OptionResponseDto<string>>> Handle(GetCustomersByNameQuery request, CancellationToken cancellationToken)
            {
                var result = await _context
                    .Customers
                    .Where(x => x.ContactName.Contains(request.Name) || string.IsNullOrEmpty(request.Name))
                    .Select(x => new OptionResponseDto<string>()
                    {
                        Display = x.ContactName,
                        Value = x.CustomerId
                    })
                    .ToListAsync();

                return result;
            }
        }
    }
}
