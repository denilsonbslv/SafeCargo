namespace SafeCargo.Server.DTOs
{
    /// <summary>
    /// DTO para transportar dados do usuário.
    /// </summary>
    public class UserDTO
    {
        /// <summary>
        /// Identificador único do usuário.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nome de usuário para login.
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Código do nível de acesso do usuário.
        /// </summary>
        public string CodLevel { get; set; }

        /// <summary>
        /// Data e hora de criação do usuário.
        /// </summary>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Data e hora da última atualização do usuário.
        /// </summary>
        public DateTime? UpdatedAt { get; set; }

        /// <summary>
        /// Data e hora de exclusão lógica do usuário.
        /// </summary>
        public DateTime? DeletedAt { get; set; }
    }
}
