using FluentValidation;
using sttb.Contracts.RequestModels.Events;

namespace sttb.Commons.Validators.Events;

public class DeleteEventRequestValidator : AbstractValidator<DeleteEventRequest>
{
    public DeleteEventRequestValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty();
    }
}
