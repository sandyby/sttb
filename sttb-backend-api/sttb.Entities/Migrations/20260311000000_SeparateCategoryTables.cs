using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sttb.Entities.Migrations
{
    /// <inheritdoc />
    public partial class SeparateCategoryTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Create EventCategories table
            migrationBuilder.CreateTable(
                name: "EventCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Slug = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventCategories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventCategories_Slug",
                table: "EventCategories",
                column: "Slug",
                unique: true);

            // Create MediaCategories table
            migrationBuilder.CreateTable(
                name: "MediaCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Slug = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaCategories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MediaCategories_Slug",
                table: "MediaCategories",
                column: "Slug",
                unique: true);

            // Add CategoryId FK to News
            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "News",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_News_CategoryId",
                table: "News",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_News_NewsCategories_CategoryId",
                table: "News",
                column: "CategoryId",
                principalTable: "NewsCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            // Add CategoryId FK to Events
            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "Events",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Events_CategoryId",
                table: "Events",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_EventCategories_CategoryId",
                table: "Events",
                column: "CategoryId",
                principalTable: "EventCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            // Add CategoryId FK to Media
            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "Media",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Media_CategoryId",
                table: "Media",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Media_MediaCategories_CategoryId",
                table: "Media",
                column: "CategoryId",
                principalTable: "MediaCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            // Drop old string Category columns
            migrationBuilder.DropColumn(
                name: "Category",
                table: "News");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Media");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_News_NewsCategories_CategoryId", table: "News");
            migrationBuilder.DropForeignKey(name: "FK_Events_EventCategories_CategoryId", table: "Events");
            migrationBuilder.DropForeignKey(name: "FK_Media_MediaCategories_CategoryId", table: "Media");

            migrationBuilder.DropIndex(name: "IX_News_CategoryId", table: "News");
            migrationBuilder.DropIndex(name: "IX_Events_CategoryId", table: "Events");
            migrationBuilder.DropIndex(name: "IX_Media_CategoryId", table: "Media");

            migrationBuilder.DropColumn(name: "CategoryId", table: "News");
            migrationBuilder.DropColumn(name: "CategoryId", table: "Events");
            migrationBuilder.DropColumn(name: "CategoryId", table: "Media");

            migrationBuilder.DropTable(name: "EventCategories");
            migrationBuilder.DropTable(name: "MediaCategories");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "News",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Events",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Media",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }
    }
}
