using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HopTri.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFieldImageProductCategoryEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "ProductCategories",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "ProductCategories");
        }
    }
}
