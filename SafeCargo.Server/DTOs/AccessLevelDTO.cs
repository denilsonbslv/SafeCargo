namespace SafeCargo.Server.DTOs
{
    /// <summary>
    /// Data Transfer Object para a entidade AccessLevel.
    /// </summary>
    public class AccessLevelDTO
    {
        /// <summary>
        /// Código do nível de acesso.
        /// </summary>
        public string CodLevel { get; set; }

        /// <summary>
        /// Descrição do nível de acesso.
        /// </summary>
        public string DescLevel { get; set; }
    }
}
