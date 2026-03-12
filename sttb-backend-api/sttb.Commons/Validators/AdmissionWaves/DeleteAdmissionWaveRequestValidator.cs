using FluentValidation;
using sttb.Contracts.RequestModels.AdmissionWaves;

namespace sttb.Commons.Validators.AdmissionWaves;

public class DeleteAdmissionWaveRequestValidator : AbstractValidator<DeleteAdmissionWaveRequest>
{
    public DeleteAdmissionWaveRequestValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
