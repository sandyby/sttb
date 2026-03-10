using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sttb.Entities.Migrations
{
    /// <inheritdoc />
    public partial class AddExcerptFeatured_EventCategory_MediaCategoryTag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Media",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "Media",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "Tag",
                table: "Media");
        }
    }
}
