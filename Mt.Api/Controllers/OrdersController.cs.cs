using MediatR;
using Microsoft.AspNetCore.Mvc;
using Mt.Application.Operations.Commands;
using Mt.Application.Operations.Queries;
using System;
using System.Threading.Tasks;

namespace Mt.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrdersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] DateTime? from, [FromQuery] DateTime? to, [FromQuery] string shipCountry)
        {
            var result = await _mediator.Send(new GetOrdersQuery(from, to, shipCountry));
            return Ok(result);
        }

        [HttpGet]
        [Route("{customerId}")]
        public async Task<IActionResult> GetOrderByCustomerId([FromRoute] string customerId)
        {
            var result = await _mediator.Send(new GetOrdersByCustomerIdQuery(customerId));
            return Ok(result);
        }

        [HttpDelete]
        [Route("{customerId}/{orderId}")]
        public async Task<IActionResult> Delete([FromRoute] string customerId, [FromRoute] int orderId) 
        {
            await _mediator.Send(new DeleteCustomerOrderCommand(customerId, orderId));
            return Ok();
        }
    }
}
