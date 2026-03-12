using FluentValidation;
using sttb.Contracts.RequestModels.Lecturers;

namespace sttb.Commons.Validators.Lecturers;

public class GetLecturerListRequestValidator : AbstractValidator<GetLecturerListRequest>
{
    private static readonly string[] AllowedRanks = { "pimpinan", "tetap", "tidak-tetap" };

    public GetLecturerListRequestValidator()
    {
        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1);

        RuleFor(x => x.PageSize)
            .InclusiveBetween(1, 200);

        RuleFor(x => x.Rank)
            .Must(r => AllowedRanks.Contains(r))
            .When(x => x.Rank is not null)
            .WithMessage("Rank must be 'pimpinan', 'tetap', or 'tidak-tetap'.");

        RuleFor(x => x.Search)
            .MaximumLength(200)
            .When(x => x.Search is not null);
    }
}
