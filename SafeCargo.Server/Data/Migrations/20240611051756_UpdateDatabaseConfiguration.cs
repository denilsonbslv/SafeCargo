using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SafeCargo.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabaseConfiguration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AccessLevels",
                keyColumn: "CodLevel",
                keyValue: "ADMIN",
                column: "CreatedAt",
                value: new DateTime(2024, 6, 10, 22, 45, 5, 112, DateTimeKind.Utc).AddTicks(7061));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2024, 6, 10, 22, 45, 5, 113, DateTimeKind.Utc).AddTicks(8687), "jl3O8QjBKZMBlNb07vZotQ==.vbYYRwItOdoc5Yq873kcuZjSnA2e+YLoHhPDFe3Wf0I=" });
        }
    }
}
