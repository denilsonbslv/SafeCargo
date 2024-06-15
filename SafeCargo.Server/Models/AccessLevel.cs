using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SafeCargo.Server.Models
{
    /// <summary>
    /// Representa um usuário do sistema.
    /// </summary>
    public class AccessLevel
    {
        /// <summary>
        /// Código do nível de acesso do usuário.
        /// </summary>
        [Key]
        [StringLength(32)]
        public string CodLevel { get; set; }

        /// <summary>
        /// descricao do nível de acesso do usuário.
        /// </summary>
        [Required]
        [StringLength(50)]
        public string DescLevel { get; set; }

        /// <summary>
        /// Descrição detalhada do nível de acesso.
        /// </summary>
        [Required]
        [StringLength(256)]
        public string Description { get; set; }

        /// <summary>
        /// Data e hora de criação do Level.
        /// </summary>
        [Required]
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Data e hora da última atualização do Level. Pode ser nula.
        /// </summary>
        public DateTime? UpdatedAt { get; set; }

        /// <summary>
        /// Data e hora de exclusão lógica do Level. Pode ser nula.
        /// </summary>
        public DateTime? DeletedAt { get; set; }
    }
}
