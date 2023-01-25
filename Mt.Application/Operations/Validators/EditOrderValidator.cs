using FluentValidation;
using MediatR;
using Mt.Application.Commons;
using Mt.Application.Operations.Commands.RequestDtos;
using Mt.Application.Operations.Queries;
using Mt.SeedWork;
using System;
using System.Linq;

namespace Mt.Application.Operations.Validators
{
    public class EditOrderValidator : AbstractValidator<EditOrderRequestDto>
    {
        public EditOrderValidator(IMediator mediator)
        {
            RuleFor(x => x.CustomerId).NotEmpty();

            //RuleFor(x => x.OrderDate.ToDateTime()).GreaterThan(DateTime.Now.AddDays(-1));

            RuleFor(x => x.ShipCountry).NotEmpty().Must(propValue =>
            {
                var countries = mediator.Send(new GetMetaDataQuery(MetaDataTypes.Countries)).Result;
                bool exists = countries.Any(x => x.ToLower() == propValue.ToLower());
                return exists;
            }).WithMessage("invalid country");

            RuleFor(x => x.ShipAddress).MaximumLength(200);
        }
    }
}
