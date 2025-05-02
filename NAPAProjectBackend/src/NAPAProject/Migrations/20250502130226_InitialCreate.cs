using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NAPAProject.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Visited = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Ships",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Speed = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ships", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Ports",
                columns: table => new
                {
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    CountryName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ports", x => x.Name);
                    table.ForeignKey(
                        name: "FK_Ports_Countries_CountryName",
                        column: x => x.CountryName,
                        principalTable: "Countries",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Voyages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    DeparturePort = table.Column<string>(type: "TEXT", nullable: false),
                    ArrivalPort = table.Column<string>(type: "TEXT", nullable: false),
                    StartTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EndTime = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voyages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Voyages_Ports_ArrivalPort",
                        column: x => x.ArrivalPort,
                        principalTable: "Ports",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Voyages_Ports_DeparturePort",
                        column: x => x.DeparturePort,
                        principalTable: "Ports",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ports_CountryName",
                table: "Ports",
                column: "CountryName");

            migrationBuilder.CreateIndex(
                name: "IX_Voyages_ArrivalPort",
                table: "Voyages",
                column: "ArrivalPort");

            migrationBuilder.CreateIndex(
                name: "IX_Voyages_DeparturePort",
                table: "Voyages",
                column: "DeparturePort");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ships");

            migrationBuilder.DropTable(
                name: "Voyages");

            migrationBuilder.DropTable(
                name: "Ports");

            migrationBuilder.DropTable(
                name: "Countries");
        }
    }
}
