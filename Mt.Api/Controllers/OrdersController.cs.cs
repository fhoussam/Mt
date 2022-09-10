using MediatR;
using Microsoft.AspNetCore.Mvc;
using Mt.Application.Operations.Commands;
using Mt.Application.Operations.Commands.RequestDtos;
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

        [HttpPost]
        [Route("{id}")]
        public async Task<IActionResult> Post([FromRoute] int id, [FromBody] EditOrderRequestDto customerValues)
        {
            var result = await _mediator.Send(new EditOrderCommand(id, customerValues));
            return Ok(result);
        }

        [HttpGet]
        [Route("{orderId}/edit")]
        public async Task<IActionResult> Get([FromRoute] int orderId)
        {
            var result = await _mediator.Send(new GetOrderByIdForEditQuery(orderId));
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetOrdersQuery getOrdersQuery)
        {
            var result = await _mediator.Send(getOrdersQuery);
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
