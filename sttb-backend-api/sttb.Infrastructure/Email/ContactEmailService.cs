using Microsoft.Extensions.Logging;

namespace sttb.Infrastructure.Email;

/// <summary>
/// Placeholder for /kontak-kami form email sending — Phase 2.
/// </summary>
public class ContactEmailService
{
    private readonly ILogger<ContactEmailService> _logger;

    public ContactEmailService(ILogger<ContactEmailService> logger)
    {
        _logger = logger;
    }

    public Task SendContactFormAsync(string name, string email, string message, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Contact form received from {Email} — email service not yet configured.", email);
        return Task.CompletedTask;
    }
}
