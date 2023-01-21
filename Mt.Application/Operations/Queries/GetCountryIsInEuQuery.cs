using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Mt.Application.Operations.Queries
{
    public class GetCountryIsInEuQuery : IRequest<bool>
    {
        public string CountryName { get; set; }

        public GetCountryIsInEuQuery(string contactName)
        {
            CountryName = contactName;
        }

        public class GetCountryIsInEuQueryHandler : IRequestHandler<GetCountryIsInEuQuery, bool>
        {
            private static readonly HashSet<string> EUCountries = new HashSet<string>()
            {
                "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
                "Denmark", "Estonia", "Finland", "France", "Germany", "Greece",
                "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg",
                "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia",
                "Slovenia", "Spain", "Sweden", "United Kingdom"
            };

            public async Task<bool> Handle(GetCountryIsInEuQuery request, CancellationToken cancellationToken)
            {
                var result = await Task<bool>.Run(() => { return EUCountries.Contains(request.CountryName); });
                return result;
            }
        }
    }
}
