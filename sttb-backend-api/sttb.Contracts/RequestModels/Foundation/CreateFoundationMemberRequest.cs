using MediatR;

namespace sttb.Contracts.RequestModels.Foundation;

public class CreateFoundationMemberRequest : IRequest<Guid>
{
    public string Name { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty; // pembina, pengurus, anggota
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}
