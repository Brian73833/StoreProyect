using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using StoreBackend.Exceptions;

namespace StoreBackend.Api.Filters;

public class MessageExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.Exception is not MessageException exception)
            return;

        context.Result = exception switch
        {
            ResourceNotFoundException =>
                new NotFoundObjectResult(exception.Message),

            BadRequestResponseException =>
                new BadRequestObjectResult(exception.Message),

            UnauthorizedResponseException =>
                new UnauthorizedObjectResult(exception.Message),

            _ => null
        };

        context.ExceptionHandled = true;
    }
}
