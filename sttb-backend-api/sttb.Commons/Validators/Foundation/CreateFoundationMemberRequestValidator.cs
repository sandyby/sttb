using FluentValidation;
using sttb.Contracts.RequestModels.Foundation;

namespace sttb.Commons.Validators.Foundation;

public class CreateFoundationMemberRequestValidator : AbstractValidator<CreateFoundationMemberRequest>
{
    public CreateFoundationMemberRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(300);

        RuleFor(x => x.Position)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Category)
            .NotEmpty()
            .Must(x => new[] { "pembina", "pengurus", "anggota" }.Contains(x))
            .WithMessage("Category must be 'pembina', 'pengurus', or 'anggota'.");

        RuleFor(x => x.Description)
            .MaximumLength(1000)
            .When(x => x.Description is not null);

        RuleFor(x => x.ImageUrl)
            .MaximumLength(1000)
            .When(x => x.ImageUrl is not null);

        RuleFor(x => x.DisplayOrder)
            .GreaterThanOrEqualTo(0);
    }
}
