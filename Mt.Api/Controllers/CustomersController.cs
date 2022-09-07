using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mt.Application.Operations.Commands;
using Mt.Application.Operations.Commands.RequestDtos;
using Mt.Application.Operations.Queries;
using System.Threading.Tasks;

namespace Mt.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CustomersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetCustomersQuery getCustomersQuery)
        {
            var result = await _mediator.Send(getCustomersQuery);
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}/edit")]
        
        public async Task<IActionResult> Edit([FromRoute] string id)
        {
            var result = await _mediator.Send(new GetCustomersByIdForEditQuery(id));
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] string id)
        {
            var result = await _mediator.Send(new GetCustomersByIdQuery(id));
            return Ok(result);
        }

        [HttpGet]
        [Route("exists/{id}")]
        public async Task<IActionResult> CustomerExisting([FromRoute] string id)
        {
            var result = await _mediator.Send(new CustomerExistingQuery(id));
            return Ok(result);
        }

        [HttpPost]
        [Route("{id}")]
        public async Task<IActionResult> Post([FromRoute] string id, [FromBody] EditCustomerRequestDto customerValues)
        {
            var result = await _mediator.Send(new EditCustomerCommand(id, customerValues));
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AddCustomerRequestDto customerValues)
        {
            var result = await _mediator.Send(new AddCustomerCommand(customerValues));
            return Ok(result);
        }
    }
}
