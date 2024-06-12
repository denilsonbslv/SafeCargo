﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SafeCargo.Server.Data;

#nullable disable

namespace SafeCargo.Server.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240612031426_SeedAccessLevels")]
    partial class SeedAccessLevels
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("SafeCargo.Server.Models.AccessLevel", b =>
                {
                    b.Property<string>("CodLevel")
                        .HasMaxLength(32)
                        .HasColumnType("varchar(32)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("DescLevel")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("CodLevel");

                    b.ToTable("AccessLevels");

                    b.HasData(
                        new
                        {
                            CodLevel = "ADMIN",
                            CreatedAt = new DateTime(2024, 6, 12, 3, 14, 25, 789, DateTimeKind.Utc).AddTicks(582),
                            DescLevel = "Administrador"
                        },
                        new
                        {
                            CodLevel = "MANAGER",
                            CreatedAt = new DateTime(2024, 6, 12, 3, 14, 25, 789, DateTimeKind.Utc).AddTicks(584),
                            DescLevel = "Gerente"
                        },
                        new
                        {
                            CodLevel = "SUPERVISOR",
                            CreatedAt = new DateTime(2024, 6, 12, 3, 14, 25, 789, DateTimeKind.Utc).AddTicks(585),
                            DescLevel = "Supervisor"
                        },
                        new
                        {
                            CodLevel = "OPERATOR",
                            CreatedAt = new DateTime(2024, 6, 12, 3, 14, 25, 789, DateTimeKind.Utc).AddTicks(586),
                            DescLevel = "Operador"
                        },
                        new
                        {
                            CodLevel = "VIEWER",
                            CreatedAt = new DateTime(2024, 6, 12, 3, 14, 25, 789, DateTimeKind.Utc).AddTicks(587),
                            DescLevel = "Visualizador"
                        });
                });

            modelBuilder.Entity("SafeCargo.Server.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CodLevel")
                        .IsRequired()
                        .HasColumnType("varchar(32)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("CodLevel");

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CodLevel = "ADMIN",
                            CreatedAt = new DateTime(2024, 6, 12, 3, 14, 25, 790, DateTimeKind.Utc).AddTicks(1968),
                            PasswordHash = "1nrcu3IznQ5KWSbtFZ6SHw==.vH72FivywEPTMcryMTFUXz0x/G5k2Qd/f75+zfctxOA=",
                            Username = "admin"
                        });
                });

            modelBuilder.Entity("SafeCargo.Server.Models.User", b =>
                {
                    b.HasOne("SafeCargo.Server.Models.AccessLevel", "AccessLevel")
                        .WithMany()
                        .HasForeignKey("CodLevel")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("AccessLevel");
                });
#pragma warning restore 612, 618
        }
    }
}