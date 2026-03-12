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

        RuleFor(x => x.Section)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Content)
            .MaximumLength(50000); // 50k chars is plenty

        RuleFor(x => x.MetaDescription)
            .MaximumLength(500);

        RuleFor(x => x.MetaKeywords)
            .MaximumLength(500);
    }
}
