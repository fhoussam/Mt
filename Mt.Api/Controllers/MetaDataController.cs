using MediatR;
using Microsoft.AspNetCore.Mvc;
using Mt.Application.Commons;
using Mt.Application.Operations.Queries;
using System.Threading.Tasks;

namespace Mt.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MetaDataController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MetaDataController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route("countries")]
        public async Task<IActionResult> GetCountries()
        {
            var result = await _mediator.Send(new GetMetaDataQuery(MetaDataTypes.Countries));
            return Ok(result);
        }

        [HttpGet]
        [Route("countries/{countryName}/in-eu")]
        public async Task<IActionResult> GetCountries([FromRoute] string countryName)
        {
            var result = await _mediator.Send(new GetCountryIsInEuQuery(countryName));
            return Ok(result);
        }

        [HttpGet]
        [Route("cities")]
        public async Task<IActionResult> GetCities()
        {
            var result = await _mediator.Send(new GetMetaDataQuery(MetaDataTypes.Cities));
            return Ok(result);
        }
    }
}
