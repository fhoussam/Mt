using MediatR;
using Microsoft.AspNetCore.Mvc;
using Mt.Application.Operations.Queries;
using System.Threading.Tasks;

namespace Mt.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public EmployeesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route("experienced-enough")]
        public async Task<IActionResult> GetIsExperiencedEnough([FromQuery] GetEmployeeExperiencedQuery getEmployeeExperiencedQuery)
        {
            var result = await _mediator.Send(getEmployeeExperiencedQuery);
            return Ok(result);
        }

        [HttpGet]
        [Route("options")]
        public async Task<IActionResult> GetOptions([FromQuery] string name)
        {
            var result = await _mediator.Send(new GetEmployeesByNameQuery(name));
            return Ok(result);
        }
    }
}
