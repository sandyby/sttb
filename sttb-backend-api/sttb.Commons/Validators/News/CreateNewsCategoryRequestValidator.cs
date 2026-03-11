using FluentValidation;
using sttb.Contracts.RequestModels.News;

namespace sttb.Commons.Validators.News;

public class CreateNewsCategoryRequestValidator : AbstractValidator<CreateNewsCategoryRequest>
{
    public CreateNewsCategoryRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Slug).NotEmpty().MaximumLength(100);
    }
}
