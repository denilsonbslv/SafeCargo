namespace SafeCargo.Server.DTOs
{
    /// <summary>
    /// DTO para criação de um novo usuário.
    /// </summary>
    public class UserCreateDTO
    {
        /// <summary>
        /// Nome de usuário para login.
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Senha do usuário.
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Código do nível de acesso do usuário.
        /// </summary>
        public string CodLevel { get; set; }
    }
}
