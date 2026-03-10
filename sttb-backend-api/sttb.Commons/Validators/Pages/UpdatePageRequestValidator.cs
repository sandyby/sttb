using FluentValidation;
using sttb.Contracts.RequestModels.Pages;

namespace sttb.Commons.Validators.Pages;

public class UpdatePageRequestValidator : AbstractValidator<UpdatePageRequest>
{
    public UpdatePageRequestValidator()
    {
        RuleFor(x => x.Slug)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(500);

        RuleFor(x => x.Body)
            .NotEmpty();
    }
}
