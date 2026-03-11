using FluentValidation;
using sttb.Contracts.RequestModels.Auth;

namespace sttb.Commons.Validators.Auth;

public class LogoutRequestValidator : AbstractValidator<LogoutRequest>
{
    public LogoutRequestValidator()
    {
        RuleFor(x => x.RefreshToken)
            .NotEmpty()
            .MaximumLength(500);
    }
}
