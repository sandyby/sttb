using FluentValidation;
using sttb.Contracts.RequestModels.News;

namespace sttb.Commons.Validators.News;

public class DeleteNewsRequestValidator : AbstractValidator<DeleteNewsRequest>
{
    public DeleteNewsRequestValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty();
    }
}
