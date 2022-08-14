using FluentValidation;
using MediatR;
using Mt.Application.Commons;
using Mt.Application.Operations.Commands.RequestDtos;
using Mt.Application.Operations.Queries;
using System.Linq;

namespace Mt.Application.Operations.Validators
{
    public class AddCustomerValidator : AbstractValidator<AddCustomerRequestDto>
    {
        public AddCustomerValidator(IMediator mediator)
        {
            RuleFor(x => x.CustomerId).MaximumLength(5).NotEmpty().Must(propValue =>
            {
                var exists = mediator.Send(new CustomerExistingQuery(propValue)).Result;
                return !exists;
            }).WithMessage("customer id should be unique");

            RuleFor(x => x.CompanyName).NotEmpty().MinimumLength(5).MaximumLength(50);

            RuleFor(x => x.ContactName).MinimumLength(5).MaximumLength(50);

            RuleFor(x => x.PostalCode).Matches("[A-Z0-9 -]*");

            RuleFor(x => x.City).Must(propValue =>
            {
                var cities = mediator.Send(new GetMetaDataQuery(MetaDataTypes.Cities)).Result;
                bool exists = cities.Any(x => x.ToLower() == propValue.ToLower());
                return exists;
            }).WithMessage("invalid city");

            RuleFor(x => x.Country).NotEmpty().Must(propValue =>
            {
                var countries = mediator.Send(new GetMetaDataQuery(MetaDataTypes.Countries)).Result;
                bool exists = countries.Any(x => x.ToLower() == propValue.ToLower());
                return exists;
            }).WithMessage("invalid country");
        }

    }
}
