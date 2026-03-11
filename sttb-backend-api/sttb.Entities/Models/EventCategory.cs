using System.ComponentModel.DataAnnotations;

namespace sttb.Entities.Models;

public class EventCategory
{
    [Key]
    public Guid Id { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [StringLength(100)]
    public string Slug { get; set; } = string.Empty;
}
