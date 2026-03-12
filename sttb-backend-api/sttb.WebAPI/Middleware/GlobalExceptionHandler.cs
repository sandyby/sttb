using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using sttb.Commons.Exceptions;

namespace sttb.WebAPI.Middleware;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext context,
        Exception exception,
        CancellationToken cancellationToken
    )
    {
        _logger.LogError(exception, "Unhandled exception: {Message}", exception.Message);

        var (statusCode, title) = exception switch
        {
            NotFoundException => (StatusCodes.Status404NotFound, exception.Message),
            UnauthorizedAccessException => (StatusCodes.Status401Unauthorized, exception.Message),
            ValidationException => (StatusCodes.Status400BadRequest, "Validation failed!"),
            InvalidOperationException => (StatusCodes.Status400BadRequest, exception.Message),
            _ => (StatusCodes.Status500InternalServerError, "An unexpected error occurred."),
        };

        // NEVER expose stack traces or inner exceptions
        var problemDetails = new ProblemDetails { Status = statusCode, Title = title };

        if (exception is ValidationException validationException)
        {
            problemDetails.Extensions["errors"] = validationException
                .Errors.Select(e => new { e.PropertyName, e.ErrorMessage })
                .ToList();
        }

        context.Response.StatusCode = statusCode;
        await context.Response.WriteAsJsonAsync(problemDetails, cancellationToken);
        return true;
    }
}
