using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SafeCargo.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedAccessLevels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AccessLevels",
                keyColumn: "CodLevel",
                keyValue: "ADMIN",
                column: "CreatedAt",
                value: new DateTime(2024, 6, 12, 3, 14, 25, 789, DateTimeKind.Utc).AddTicks(582));

            migrationBuilder.InsertData(
                table: "AccessLevels",
                columns: new[] { "CodLevel", "CreatedAt", "DeletedAt", "DescLevel", "UpdatedAt" },
                values: new object[,]
                {
                    { "MANAGER", new DateTime(2024, 6, 12, 3, 14, 25, 789, DateTimeKind.Utc).AddTicks(584), null, "Gerente", null },
                    { "OPERATOR", new DateTime(2024, 6, 12, 3, 14, 25, 789, DateTimeKind.Utc).AddTicks(586), null, "Operador", null },
                    { "SUPERVISOR", new DateTime(2024, 6, 12, 3, 14, 25, 789, DateTimeKind.Utc).AddTicks(585), null, "Supervisor", null },
                    { "VIEWER", new DateTime(2024, 6, 12, 3, 14, 25, 789, DateTimeKind.Utc).AddTicks(587), null, "Visualizador", null }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2024, 6, 12, 3, 14, 25, 790, DateTimeKind.Utc).AddTicks(1968), "1nrcu3IznQ5KWSbtFZ6SHw==.vH72FivywEPTMcryMTFUXz0x/G5k2Qd/f75+zfctxOA=" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AccessLevels",
                keyColumn: "CodLevel",
                keyValue: "MANAGER");

            migrationBuilder.DeleteData(
                table: "AccessLevels",
                keyColumn: "CodLevel",
                keyValue: "OPERATOR");

            migrationBuilder.DeleteData(
                table: "AccessLevels",
                keyColumn: "CodLevel",
                keyValue: "SUPERVISOR");

            migrationBuilder.DeleteData(
                table: "AccessLevels",
                keyColumn: "CodLevel",
                keyValue: "VIEWER");

            migrationBuilder.UpdateData(
                table: "AccessLevels",
                keyColumn: "CodLevel",
                keyValue: "ADMIN",
                column: "CreatedAt",
                value: new DateTime(2024, 6, 11, 5, 17, 56, 386, DateTimeKind.Utc).AddTicks(7469));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2024, 6, 11, 5, 17, 56, 387, DateTimeKind.Utc).AddTicks(8933), "TDcJSSTKJW9ZbJ8zjhDXhw==.V1i+/LU7c0gwZtZ1C61KBvBmSY6EOMbpwZBQMB39nWM=" });
        }
    }
}
