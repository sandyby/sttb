using FluentValidation;
using sttb.Contracts.RequestModels.Upload;

namespace sttb.Commons.Validators.Upload;

public class UploadVideoRequestValidator : AbstractValidator<UploadVideoRequest>
{
    private const long MaxVideoSizeBytes = 200 * 1024 * 1024; // 200 MB

    public UploadVideoRequestValidator()
    {
        RuleFor(x => x.OriginalFileName)
            .NotEmpty()
            .MaximumLength(255);

        RuleFor(x => x.FileSizeBytes)
            .GreaterThan(0)
            .LessThanOrEqualTo(MaxVideoSizeBytes)
            .WithMessage("Video must be 200 MB or smaller.");
    }
}
