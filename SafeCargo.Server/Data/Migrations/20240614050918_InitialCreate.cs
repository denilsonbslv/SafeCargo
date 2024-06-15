using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SafeCargo.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
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
                    Description = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: false)
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
                columns: new[] { "CodLevel", "CreatedAt", "DeletedAt", "DescLevel", "Description", "UpdatedAt" },
                values: new object[,]
                {
                    { "ADMIN", new DateTime(2024, 6, 14, 5, 9, 18, 359, DateTimeKind.Utc).AddTicks(8159), null, "Administrador", "Acesso total ao sistema, incluindo gerenciamento de usuários, veículos, mercadorias, relatórios e configurações do sistema.", null },
                    { "AUDT", new DateTime(2024, 6, 14, 5, 9, 18, 359, DateTimeKind.Utc).AddTicks(8164), null, "Auditor", "Acesso para visualizar todos os registros e relatórios do sistema sem permissão para fazer alterações.", null },
                    { "OPER", new DateTime(2024, 6, 14, 5, 9, 18, 359, DateTimeKind.Utc).AddTicks(8162), null, "Operador", "Acesso limitado para registrar entradas e saídas de veículos, atualizar status de mercadorias e visualizar relatórios.", null },
                    { "SUPV", new DateTime(2024, 6, 14, 5, 9, 18, 359, DateTimeKind.Utc).AddTicks(8163), null, "Supervisor", "Acesso para supervisionar as operações de entrada e saída de veículos, monitorar status de mercadorias, e gerar relatórios.", null },
                    { "VIST", new DateTime(2024, 6, 14, 5, 9, 18, 359, DateTimeKind.Utc).AddTicks(8165), null, "Visitante", "Acesso muito limitado apenas para visualizar informações públicas ou dados restritos aos visitantes.", null }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CodLevel", "CreatedAt", "DeletedAt", "PasswordHash", "UpdatedAt", "Username" },
                values: new object[] { 1, "ADMIN", new DateTime(2024, 6, 14, 5, 9, 18, 360, DateTimeKind.Utc).AddTicks(9536), null, "EL8T6Zxe9vGDHO0DB4fgPQ==.arevG9fQBmkNgwUgKJJebubwwpzUiYH62MWa0OOaCNc=", null, "admin" });

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
