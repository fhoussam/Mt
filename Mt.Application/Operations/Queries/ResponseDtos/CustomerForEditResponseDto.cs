using Mt.Application.Operations.Commands.RequestDtos;

namespace Mt.Application.Operations.Queries.ResponseDtos
{
    public class CustomerForEditResponseDto : EditCustomerRequestDto
    {
        public string CustomerId { get; set; }
    }
}
