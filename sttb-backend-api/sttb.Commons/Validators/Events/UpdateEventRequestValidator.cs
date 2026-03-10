using FluentValidation;
using sttb.Contracts.RequestModels.Events;

namespace sttb.Commons.Validators.Events;

public class UpdateEventRequestValidator : AbstractValidator<UpdateEventRequest>
{
    public UpdateEventRequestValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty();

        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(500);

        RuleFor(x => x.Description)
            .NotEmpty();

        RuleFor(x => x.StartDate)
            .NotEmpty();

        RuleFor(x => x.EndDate)
            .GreaterThanOrEqualTo(x => x.StartDate)
            .When(x => x.EndDate.HasValue)
            .WithMessage("End date must be on or after start date.");

        RuleFor(x => x.Location)
            .MaximumLength(500)
            .When(x => x.Location is not null);

        RuleFor(x => x.ImageUrl)
            .MaximumLength(1000)
            .When(x => x.ImageUrl is not null);
    }
}
