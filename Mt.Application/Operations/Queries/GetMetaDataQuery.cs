using MediatR;
using Microsoft.EntityFrameworkCore;
using Mt.Application.Commons;
using Mt.Application.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetMetaDataQuery : IRequest<IEnumerable<string>>
    {
        public MetaDataTypes MetaDataType { get; set; }

        public GetMetaDataQuery(MetaDataTypes metaDataType)
        {
            MetaDataType = metaDataType;
        }

        public class GetMetaDataQueryHandler : IRequestHandler<GetMetaDataQuery, IEnumerable<string>>
        {
            private readonly INorthWindDbContext _context;

            public GetMetaDataQueryHandler(INorthWindDbContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<string>> Handle(GetMetaDataQuery request, CancellationToken cancellationToken)
            {
                switch (request.MetaDataType)
                {
                    case MetaDataTypes.Countries:
                        return await _context.Customers.Select(x => x.Country).AsNoTracking().Distinct().OrderBy(x => x).ToListAsync();
                    case MetaDataTypes.Cities:
                        return await _context.Customers.Select(x => x.City).AsNoTracking().Distinct().OrderBy(x => x).ToListAsync();
                    default:
                        return Enumerable.Empty<string>();
                }
            }
        }
    }
}
