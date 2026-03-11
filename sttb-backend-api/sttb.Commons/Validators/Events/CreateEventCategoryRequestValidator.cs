using FluentValidation;
using sttb.Contracts.RequestModels.Events;

namespace sttb.Commons.Validators.Events;

public class CreateEventCategoryRequestValidator : AbstractValidator<CreateEventCategoryRequest>
{
    public CreateEventCategoryRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Slug).NotEmpty().MaximumLength(100);
    }
}
