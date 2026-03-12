using MediatR;
using sttb.Contracts.ResponseModels.Scholarships;

namespace sttb.Contracts.RequestModels.Scholarships;

public class GetScholarshipListRequest : IRequest<GetScholarshipListResponse>
{
    public bool? IsActive { get; set; }
}

public class CreateScholarshipRequest : IRequest<Guid>
{
    public string Name { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty;
    public string Color { get; set; } = "#E62129";
    public string? ImageUrl { get; set; }
    public string Description { get; set; } = string.Empty;
    public List<string> Requirements { get; set; } = new();
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}

public class UpdateScholarshipRequest : IRequest<Unit>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty;
    public string Color { get; set; } = "#E62129";
    public string? ImageUrl { get; set; }
    public string Description { get; set; } = string.Empty;
    public List<string> Requirements { get; set; } = new();
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}

public class DeleteScholarshipRequest : IRequest<Unit>
{
    public Guid Id { get; set; }
}
