using FluentValidation;
using sttb.Contracts.RequestModels.Media;

namespace sttb.Commons.Validators.Media;

public class CreateMediaCategoryRequestValidator : AbstractValidator<CreateMediaCategoryRequest>
{
    public CreateMediaCategoryRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Slug).NotEmpty().MaximumLength(100);
    }
}
