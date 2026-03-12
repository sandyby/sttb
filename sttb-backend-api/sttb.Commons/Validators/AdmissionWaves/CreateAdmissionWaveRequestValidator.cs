using FluentValidation;
using sttb.Contracts.RequestModels.AdmissionWaves;

namespace sttb.Commons.Validators.AdmissionWaves;

public class CreateAdmissionWaveRequestValidator : AbstractValidator<CreateAdmissionWaveRequest>
{
    private static readonly string[] AllowedStatuses = { "open", "closed", "upcoming" };

    public CreateAdmissionWaveRequestValidator()
    {
        RuleFor(x => x.WaveNumber).NotEmpty().MaximumLength(20);
        RuleFor(x => x.Label).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Deadline).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Status)
            .NotEmpty()
            .Must(s => AllowedStatuses.Contains(s))
            .WithMessage("Status must be 'open', 'closed', or 'upcoming'.");
        RuleFor(x => x.Color).NotEmpty().MaximumLength(20);
        RuleFor(x => x.DisplayOrder).GreaterThanOrEqualTo(0);
        RuleForEach(x => x.Steps).ChildRules(step =>
        {
            step.RuleFor(s => s.Title).NotEmpty().MaximumLength(300);
            step.RuleFor(s => s.Via).MaximumLength(100);
            step.RuleFor(s => s.StepNumber).GreaterThan(0);
        });
    }
}
