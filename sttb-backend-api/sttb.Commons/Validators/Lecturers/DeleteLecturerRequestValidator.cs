using FluentValidation;
using sttb.Contracts.RequestModels.Lecturers;

namespace sttb.Commons.Validators.Lecturers;

public class DeleteLecturerRequestValidator : AbstractValidator<DeleteLecturerRequest>
{
    public DeleteLecturerRequestValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty();
    }
}
