using MediatR;

namespace sttb.Contracts.RequestModels.Lecturers;

public class DeleteLecturerRequest : IRequest
{
    public Guid Id { get; set; }
}
