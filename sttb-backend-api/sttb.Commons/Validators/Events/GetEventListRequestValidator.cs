using FluentValidation;
using sttb.Contracts.RequestModels.Events;

namespace sttb.Commons.Validators.Events;

public class GetEventListRequestValidator : AbstractValidator<GetEventListRequest>
{
    public GetEventListRequestValidator()
    {
        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1);

        RuleFor(x => x.PageSize)
            .InclusiveBetween(1, 100);
    }
}
