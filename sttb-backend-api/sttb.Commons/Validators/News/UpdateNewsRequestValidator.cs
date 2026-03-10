using FluentValidation;
using sttb.Contracts.RequestModels.News;

namespace sttb.Commons.Validators.News;

public class UpdateNewsRequestValidator : AbstractValidator<UpdateNewsRequest>
{
    public UpdateNewsRequestValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty();

        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(500);

        RuleFor(x => x.Slug)
            .NotEmpty()
            .MaximumLength(1000)
            .Matches(@"^[a-z0-9]+(?:-[a-z0-9]+)*$")
            .WithMessage("Slug must be lowercase letters, numbers, and hyphens only.");

        RuleFor(x => x.Content)
            .NotEmpty();

        RuleFor(x => x.ThumbnailUrl)
            .MaximumLength(1000)
            .When(x => x.ThumbnailUrl is not null);

        RuleFor(x => x.Category)
            .MaximumLength(100)
            .When(x => x.Category is not null);
    }
}
