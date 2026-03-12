using System.Text.Json;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using sttb.Entities.Models;

namespace sttb.Entities;

public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<News> News => Set<News>();
    public DbSet<NewsCategory> NewsCategories => Set<NewsCategory>();
    public DbSet<Event> Events => Set<Event>();
    public DbSet<EventCategory> EventCategories => Set<EventCategory>();
    public DbSet<Media> Media => Set<Media>();
    public DbSet<MediaCategory> MediaCategories => Set<MediaCategory>();
    public DbSet<Page> Pages => Set<Page>();
    public DbSet<StudyProgram> StudyPrograms => Set<StudyProgram>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<News>().HasIndex(n => n.Slug).IsUnique();

        builder
            .Entity<News>()
            .HasOne(n => n.Category)
            .WithMany()
            .HasForeignKey(n => n.CategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.Entity<NewsCategory>().HasIndex(c => c.Slug).IsUnique();

        builder
            .Entity<Event>()
            .HasOne(e => e.Category)
            .WithMany()
            .HasForeignKey(e => e.CategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.Entity<EventCategory>().HasIndex(c => c.Slug).IsUnique();

        builder
            .Entity<Media>()
            .HasOne(m => m.Category)
            .WithMany()
            .HasForeignKey(m => m.CategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.Entity<MediaCategory>().HasIndex(c => c.Slug).IsUnique();

        builder.Entity<Page>().HasIndex(p => p.Slug).IsUnique();

        builder.Entity<StudyProgram>(entity =>
        {
            entity.HasIndex(s => s.Slug).IsUnique();

            // Map primitive collections to JSON in SQL Server
            ConfigureStringListMapping(entity.Property(s => s.Objectives));
            ConfigureStringListMapping(entity.Property(s => s.Courses));
            ConfigureStringListMapping(entity.Property(s => s.Careers));
            ConfigureStringListMapping(entity.Property(s => s.Tags));
        });

        builder.Entity<RefreshToken>().HasIndex(r => r.Token).IsUnique();
    }

    private static void ConfigureStringListMapping(PropertyBuilder<List<string>> property)
    {
        property.HasConversion(
            v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
            v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>(),
            new ValueComparer<List<string>>(
                (c1, c2) => (c1 == null && c2 == null) || (c1 != null && c2 != null && c1.SequenceEqual(c2)),
                c => c == null ? 0 : c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                c => c == null ? new List<string>() : c.ToList()
            )
        );
        property.HasColumnType("nvarchar(max)");
    }
}
