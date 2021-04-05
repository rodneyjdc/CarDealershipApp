using Microsoft.EntityFrameworkCore.Migrations;

namespace dotnetwebapi.Migrations
{
    public partial class UpdatedCarSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Seller",
                table: "Cars",
                newName: "Owner");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Cars",
                newName: "Model");

            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Cars",
                newName: "Make");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Cars",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Cars",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "Owner",
                table: "Cars",
                newName: "Seller");

            migrationBuilder.RenameColumn(
                name: "Model",
                table: "Cars",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Make",
                table: "Cars",
                newName: "Location");
        }
    }
}
