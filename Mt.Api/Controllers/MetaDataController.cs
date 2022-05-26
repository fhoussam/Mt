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
        [Route("metaDataType")]
        public async Task<IActionResult> Get(MetaDataTypes metaDataType)
        {
            var result = await _mediator.Send(new GetMetaDataQuery(metaDataType));
            return Ok(result);
        }
    }
}
