using Microsoft.EntityFrameworkCore;
using SafeCargo.Server.Models;
using SafeCargo.Server.Utilities;
using System;

namespace SafeCargo.Server.Data
{
    /// <summary>
    /// Contexto do banco de dados da aplicação.
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        /// <summary>
        /// Construtor do ApplicationDbContext.
        /// </summary>
        /// <param name="options">As opções para configurar o contexto.</param>
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        /// <summary>
        /// Conjunto de usuários no banco de dados.
        /// </summary>
        public DbSet<User> Users { get; set; }

        /// <summary>
        /// Conjunto de níveis de acesso no banco de dados.
        /// </summary>
        public DbSet<AccessLevel> AccessLevels { get; set; }

        /// <summary>
        /// Configura o modelo de dados, incluindo restrições e relacionamentos.
        /// </summary>
        /// <param name="modelBuilder">O construtor do modelo de dados.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração da entidade User
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Username).IsUnique(); // Garantir que o Username seja único
                entity.HasQueryFilter(u => u.DeletedAt == null); // Configuração do filtro de soft delete
            });

            // Configuração da entidade AccessLevel
            modelBuilder.Entity<AccessLevel>(entity =>
            {
                entity.HasMany<User>()
                      .WithOne(u => u.AccessLevel)
                      .HasForeignKey(u => u.CodLevel)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasQueryFilter(al => al.DeletedAt == null); // Configuração do filtro de soft delete
            });

            // Seed data para AccessLevel e User
            modelBuilder.Entity<AccessLevel>().HasData(new AccessLevel
            {
                CodLevel = "ADMIN",
                DescLevel = "Administrador",
                CreatedAt = DateTime.UtcNow
            });

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1, // Assume que o Id é gerado automaticamente e é 1 para o primeiro usuário
                Username = "admin",
                PasswordHash = PasswordHasher.HashPassword("Admin@123"), // Hash da senha
                CodLevel = "ADMIN",
                CreatedAt = DateTime.UtcNow
            });
        }
    }
}
