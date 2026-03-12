using FluentValidation;
using sttb.Contracts.RequestModels.Lecturers;

namespace sttb.Commons.Validators.Lecturers;

public class CreateLecturerRequestValidator : AbstractValidator<CreateLecturerRequest>
{
    private static readonly string[] AllowedRanks = { "pimpinan", "tetap", "tidak-tetap" };

    public CreateLecturerRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(300);

        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Rank)
            .NotEmpty()
            .Must(r => AllowedRanks.Contains(r))
            .WithMessage("Rank must be 'pimpinan', 'tetap', or 'tidak-tetap'.");

        RuleFor(x => x.Degree)
            .NotEmpty()
            .MaximumLength(500);

        RuleFor(x => x.Specialization)
            .NotEmpty()
            .MaximumLength(300);

        RuleFor(x => x.Bio)
            .NotEmpty();

        RuleFor(x => x.AlmaMater)
            .NotEmpty()
            .MaximumLength(500);

        RuleFor(x => x.Origin)
            .NotEmpty()
            .MaximumLength(300);

        RuleFor(x => x.ImageUrl)
            .MaximumLength(1000)
            .When(x => x.ImageUrl is not null);

        RuleFor(x => x.Email)
            .EmailAddress()
            .MaximumLength(300)
            .When(x => !string.IsNullOrEmpty(x.Email));

        RuleFor(x => x.DisplayOrder)
            .GreaterThanOrEqualTo(0);
    }
}
