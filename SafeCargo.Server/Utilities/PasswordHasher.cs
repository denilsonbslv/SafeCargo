using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace SafeCargo.Server.Utilities
{
    /// <summary>
    /// Classe utilitária para realizar o hashing de senhas e verificar senhas.
    /// </summary>
    public static class PasswordHasher
    {
        /// <summary>
        /// Gera um hash para a senha fornecida usando PBKDF2 com HMAC-SHA256.
        /// </summary>
        /// <param name="password">A senha em texto plano para ser hasheada.</param>
        /// <returns>O hash da senha combinado com o salt, separado por um ponto.</returns>
        public static string HashPassword(string password)
        {
            // Gera um salt aleatório de 128 bits.
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // Gera o hash da senha usando PBKDF2 com HMAC-SHA256.
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            // Retorna o salt e o hash combinados em um formato específico.
            return $"{Convert.ToBase64String(salt)}.{hashed}";
        }

        /// <summary>
        /// Verifica se a senha fornecida corresponde ao hash armazenado.
        /// </summary>
        /// <param name="hashedPassword">O hash armazenado da senha, incluindo o salt.</param>
        /// <param name="providedPassword">A senha em texto plano fornecida para verificação.</param>
        /// <returns>True se a senha fornecida corresponder ao hash armazenado, caso contrário, false.</returns>
        public static bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            // Divide o hash armazenado em salt e hash.
            var parts = hashedPassword.Split('.', 2);
            if (parts.Length != 2)
            {
                throw new FormatException("Unexpected password format");
            }

            // Decodifica o salt do formato Base64.
            byte[] salt = Convert.FromBase64String(parts[0]);

            // Gera o hash da senha fornecida usando o mesmo salt.
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: providedPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            // Compara o hash gerado com o hash armazenado.
            return hashed == parts[1];
        }
    }
}
