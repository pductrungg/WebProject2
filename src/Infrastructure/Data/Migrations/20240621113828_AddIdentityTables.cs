using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HopTri.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddIdentityTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "LastModified",
                table: "ProductCategories",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "AspNetUsers",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Created",
                table: "AspNetUsers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "AspNetUsers",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DistrictId",
                table: "AspNetUsers",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DistrictName",
                table: "AspNetUsers",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "AspNetUsers",
                type: "character varying(550)",
                maxLength: 550,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LastModified",
                table: "AspNetUsers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProvinceId",
                table: "AspNetUsers",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProvinceName",
                table: "AspNetUsers",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WardId",
                table: "AspNetUsers",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WardName",
                table: "AspNetUsers",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUserRoles",
                type: "character varying(34)",
                maxLength: 34,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUserClaims",
                type: "character varying(34)",
                maxLength: 34,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Created",
                table: "AspNetRoles",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "AspNetRoles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "AspNetRoles",
                type: "boolean",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LastModified",
                table: "AspNetRoles",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "AspNetRoles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "AspNetRoleClaims",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AspNetRoleClaims",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetRoleClaims",
                type: "character varying(34)",
                maxLength: 34,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "DisplayOrder",
                table: "AspNetRoleClaims",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Group",
                table: "AspNetRoleClaims",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GroupDisplayName",
                table: "AspNetRoleClaims",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AspNetRoleClaims",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DataProtectionKeys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FriendlyName = table.Column<string>(type: "text", nullable: true),
                    Xml = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataProtectionKeys", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DataProtectionKeys");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DistrictId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DistrictName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProvinceName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "WardId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "WardName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUserRoles");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUserClaims");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "AspNetRoleClaims");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "AspNetRoleClaims");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetRoleClaims");

            migrationBuilder.DropColumn(
                name: "DisplayOrder",
                table: "AspNetRoleClaims");

            migrationBuilder.DropColumn(
                name: "Group",
                table: "AspNetRoleClaims");

            migrationBuilder.DropColumn(
                name: "GroupDisplayName",
                table: "AspNetRoleClaims");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "AspNetRoleClaims");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "LastModified",
                table: "ProductCategories",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTimeOffset),
                oldType: "timestamp with time zone");
        }
    }
}
