namespace SafeCargo.Server.DTOs
{
    /// <summary>
    /// DTO para realizar login.
    /// </summary>
    public class LoginDTO
    {
        /// <summary>
        /// Nome de usuário para login.
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Senha do usuário.
        /// </summary>
        public string Password { get; set; }
    }
}
