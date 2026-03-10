using FluentValidation;
using sttb.Contracts.RequestModels.Media;

namespace sttb.Commons.Validators.Media;

public class CreateMediaRequestValidator : AbstractValidator<CreateMediaRequest>
{
    private static readonly string[] AllowedTypes = { "image", "video", "article" };

    public CreateMediaRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(500);

        RuleFor(x => x.Url)
            .NotEmpty()
            .MaximumLength(1000);

        RuleFor(x => x.Type)
            .NotEmpty()
            .Must(t => AllowedTypes.Contains(t))
            .WithMessage("Type must be 'image', 'video', or 'article'.");

        RuleFor(x => x.ThumbnailUrl)
            .MaximumLength(1000)
            .When(x => x.ThumbnailUrl is not null);

        RuleFor(x => x.Category)
            .MaximumLength(100)
            .When(x => x.Category is not null);

        RuleFor(x => x.Tag)
            .MaximumLength(100)
            .When(x => x.Tag is not null);
    }
}
