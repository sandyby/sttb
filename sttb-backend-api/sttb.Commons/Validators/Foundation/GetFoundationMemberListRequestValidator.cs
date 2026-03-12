using FluentValidation;
using sttb.Contracts.RequestModels.Foundation;

namespace sttb.Commons.Validators.Foundation;

public class GetFoundationMemberListRequestValidator : AbstractValidator<GetFoundationMemberListRequest>
{
    public GetFoundationMemberListRequestValidator()
    {
        RuleFor(x => x.Category)
            .Must(x => string.IsNullOrEmpty(x) || new[] { "pembina", "pengurus", "anggota" }.Contains(x))
            .WithMessage("Category must be 'pembina', 'pengurus', or 'anggota' if provided.");
    }
}
