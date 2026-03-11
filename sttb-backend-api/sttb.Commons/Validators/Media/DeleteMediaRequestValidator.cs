using FluentValidation;
using sttb.Contracts.RequestModels.Media;

namespace sttb.Commons.Validators.Media;

public class DeleteMediaRequestValidator : AbstractValidator<DeleteMediaRequest>
{
    public DeleteMediaRequestValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty();
    }
}
