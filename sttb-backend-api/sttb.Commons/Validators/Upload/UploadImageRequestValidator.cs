using FluentValidation;
using sttb.Contracts.RequestModels.Upload;

namespace sttb.Commons.Validators.Upload;

public class UploadImageRequestValidator : AbstractValidator<UploadImageRequest>
{
    private static readonly string[] AllowedUploadTypes = { "news", "events", "media", "pages", "lecturers", "foundation", "scholarships" };
    private const long MaxImageSizeBytes = 5 * 1024 * 1024; // 5 MB

    public UploadImageRequestValidator()
    {
        RuleFor(x => x.OriginalFileName)
            .NotEmpty()
            .MaximumLength(255);

        RuleFor(x => x.FileSizeBytes)
            .GreaterThan(0)
            .LessThanOrEqualTo(MaxImageSizeBytes)
            .WithMessage("Image must be 5 MB or smaller.");

        RuleFor(x => x.UploadType)
            .NotEmpty()
            .Must(t => AllowedUploadTypes.Contains(t))
            .WithMessage("UploadType must be 'news', 'events', 'media', 'pages', 'lecturers', 'foundation' or 'scholarships'.");
    }
}
