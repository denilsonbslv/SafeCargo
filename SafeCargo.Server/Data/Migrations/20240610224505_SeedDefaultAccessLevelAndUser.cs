using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SafeCargo.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedDefaultAccessLevelAndUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AccessLevels",
                columns: table => new
                {
                    CodLevel = table.Column<string>(type: "varchar(32)", maxLength: 32, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DescLevel = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessLevels", x => x.CodLevel);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PasswordHash = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CodLevel = table.Column<string>(type: "varchar(32)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_AccessLevels_CodLevel",
                        column: x => x.CodLevel,
                        principalTable: "AccessLevels",
                        principalColumn: "CodLevel",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "AccessLevels",
                columns: new[] { "CodLevel", "CreatedAt", "DeletedAt", "DescLevel", "UpdatedAt" },
                values: new object[] { "ADMIN", new DateTime(2024, 6, 10, 22, 45, 5, 112, DateTimeKind.Utc).AddTicks(7061), null, "Administrador", null });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CodLevel", "CreatedAt", "DeletedAt", "PasswordHash", "UpdatedAt", "Username" },
                values: new object[] { 1, "ADMIN", new DateTime(2024, 6, 10, 22, 45, 5, 113, DateTimeKind.Utc).AddTicks(8687), null, "jl3O8QjBKZMBlNb07vZotQ==.vbYYRwItOdoc5Yq873kcuZjSnA2e+YLoHhPDFe3Wf0I=", null, "admin" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_CodLevel",
                table: "Users",
                column: "CodLevel");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "AccessLevels");
        }
    }
}
