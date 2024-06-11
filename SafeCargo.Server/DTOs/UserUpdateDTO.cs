namespace SafeCargo.Server.DTOs
{
    /// <summary>
    /// DTO para atualização de um usuário existente.
    /// </summary>
    public class UserUpdateDTO
    {
        /// <summary>
        /// Identificador único do usuário.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Nome de usuário para login.
        /// </summary>
        public string? Username { get; set; }

        /// <summary>
        /// Nova senha do usuário (opcional).
        /// </summary>
        public string? Password { get; set; }

        /// <summary>
        /// Código do nível de acesso do usuário (opcional).
        /// </summary>
        public string? CodLevel { get; set; }
    }
}
