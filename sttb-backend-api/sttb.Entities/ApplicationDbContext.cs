using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using sttb.Entities.Models;

namespace sttb.Entities;

public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<News> News => Set<News>();
    public DbSet<NewsCategory> NewsCategories => Set<NewsCategory>();
    public DbSet<Event> Events => Set<Event>();
    public DbSet<Media> Media => Set<Media>();
    public DbSet<Page> Pages => Set<Page>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<News>()
            .HasIndex(n => n.Slug)
            .IsUnique();

        builder.Entity<NewsCategory>()
            .HasIndex(c => c.Slug)
            .IsUnique();

        builder.Entity<Page>()
            .HasIndex(p => p.Slug)
            .IsUnique();

        builder.Entity<RefreshToken>()
            .HasIndex(r => r.Token)
            .IsUnique();
    }
}
