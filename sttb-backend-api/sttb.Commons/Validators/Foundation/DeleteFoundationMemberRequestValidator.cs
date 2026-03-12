using FluentValidation;
using sttb.Contracts.RequestModels.Foundation;

namespace sttb.Commons.Validators.Foundation;

public class DeleteFoundationMemberRequestValidator : AbstractValidator<DeleteFoundationMemberRequest>
{
    public DeleteFoundationMemberRequestValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty();
    }
}
