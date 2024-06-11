using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SafeCargo.Server.Models
{
    /// <summary>
    /// Representa um usuário do sistema.
    /// </summary>
    public class User
    {
        /// <summary>
        /// Identificador único do usuário. Gerado automaticamente pelo banco de dados.
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// Nome de usuário para login. Deve ser único.
        /// </summary>
        [Required]
        [StringLength(100)]
        public string Username { get; set; }

        /// <summary>
        /// Hash da senha do usuário para garantir a segurança.
        /// </summary>
        [Required]
        [StringLength(256)]
        public string PasswordHash { get; set; }

        /// <summary>
        /// Código do nível de acesso do usuário. Referência à tabela AccessLevels.
        /// </summary>
        [Required]
        public string CodLevel { get; set; }

        /// <summary>
        /// FK para o nível de acesso do usuário.
        /// </summary>
        [ForeignKey("CodLevel")]
        public AccessLevel AccessLevel { get; set; }

        /// <summary>
        /// Data e hora de criação do usuário.
        /// </summary>
        [Required]
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Data e hora da última atualização do usuário.
        /// </summary>
        public DateTime? UpdatedAt { get; set; }

        /// <summary>
        /// Data e hora de exclusão lógica do usuário. Pode ser nula.
        /// </summary>
        public DateTime? DeletedAt { get; set; }
    }
}
