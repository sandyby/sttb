using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sttb.Entities.Migrations
{
    /// <inheritdoc />
    public partial class AddLecturers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lecturers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Rank = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Degree = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Specialization = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Courses = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AlmaMater = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Origin = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lecturers", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lecturers");
        }
    }
}
