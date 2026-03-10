using FluentValidation;
using sttb.Contracts.RequestModels.News;

namespace sttb.Commons.Validators.News;

public class GetNewsListRequestValidator : AbstractValidator<GetNewsListRequest>
{
    public GetNewsListRequestValidator()
    {
        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1);

        RuleFor(x => x.PageSize)
            .InclusiveBetween(1, 100);

        RuleFor(x => x.Category)
            .MaximumLength(100)
            .When(x => x.Category is not null);

        RuleFor(x => x.Search)
            .MaximumLength(200)
            .When(x => x.Search is not null);
    }
}
