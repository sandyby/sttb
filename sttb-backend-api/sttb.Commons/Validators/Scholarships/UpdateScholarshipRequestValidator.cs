using FluentValidation;
using sttb.Contracts.RequestModels.Scholarships;

namespace sttb.Commons.Validators.Scholarships;

public class UpdateScholarshipRequestValidator : AbstractValidator<UpdateScholarshipRequest>
{
    public UpdateScholarshipRequestValidator()
    {
        RuleFor(x => x.Id).NotEmpty().WithMessage("Id beasiswa wajib diisi.");
        RuleFor(x => x.Name).NotEmpty().WithMessage("Nama beasiswa wajib diisi.");
        RuleFor(x => x.Level).NotEmpty().WithMessage("Jenjang wajib diisi.");
        RuleFor(x => x.Color).NotEmpty().Matches("^#[0-9A-Fa-f]{6}$").WithMessage("Warna harus format hex (misal: #E62129).");
        RuleFor(x => x.Description).NotEmpty().WithMessage("Deskripsi wajib diisi.");
        RuleFor(x => x.Requirements).NotEmpty().WithMessage("Minimal satu persyaratan.");
    }
}
