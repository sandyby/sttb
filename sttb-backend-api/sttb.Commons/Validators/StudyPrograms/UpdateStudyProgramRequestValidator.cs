using FluentValidation;
using sttb.Contracts.RequestModels.StudyPrograms;

namespace sttb.Commons.Validators.StudyPrograms;

public class UpdateStudyProgramRequestValidator : AbstractValidator<UpdateStudyProgramRequest>
{
    public UpdateStudyProgramRequestValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Slug).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Level).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Degree).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Accreditation).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Duration).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Credits).GreaterThan(0);
        RuleFor(x => x.Tagline).MaximumLength(500);
        RuleFor(x => x.CoverImageUrl).MaximumLength(1000);
    }
}
