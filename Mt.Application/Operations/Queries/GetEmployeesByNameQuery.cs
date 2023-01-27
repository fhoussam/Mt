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
    public class GetEmployeesByNameQuery : IRequest<IEnumerable<OptionResponseDto<string>>>
    {
        public string Name { get; set; }

        public GetEmployeesByNameQuery(string contactName)
        {
            Name = contactName;
        }

        public class GetEmployeesByNameQueryHandler : IRequestHandler<GetEmployeesByNameQuery, IEnumerable<OptionResponseDto<string>>>
        {
            private readonly INorthWindDbContext _context;

            public GetEmployeesByNameQueryHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<OptionResponseDto<string>>> Handle(GetEmployeesByNameQuery request, CancellationToken cancellationToken)
            {
                var result = await _context
                    .Employees
                    .Where(
                        x => x.FirstName.Contains(request.Name)
                        || x.LastName.Contains(request.Name)
                        || string.IsNullOrEmpty(request.Name)
                    )
                    .Select(x => new OptionResponseDto<string>()
                    {
                        Display = $"{x.FirstName} {x.LastName}",
                        Value = x.EmployeeId.ToString()
                    })
                    .ToListAsync();

                return result;
            }
        }
    }
}
