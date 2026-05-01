namespace StoreBackend.Exceptions;

public class BadRequestResponseException : Exception
{
    public BadRequestResponseException() : base("Invalid request"){}
    public BadRequestResponseException(string message) : base(message){}
}
