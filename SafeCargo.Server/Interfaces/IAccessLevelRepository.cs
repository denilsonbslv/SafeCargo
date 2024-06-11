using SafeCargo.Server.Models;

namespace SafeCargo.Server.Interfaces
{
    public interface IAccessLevelRepository
    {
        Task<IEnumerable<AccessLevel>> GetAllAccessLevelsAsync();
        Task<AccessLevel> GetAccessLevelByCodLevelAsync(string codLevel);
        Task<AccessLevel> CreateAccessLevelAsync(AccessLevel accessLevel);
        Task<AccessLevel> UpdateAccessLevelAsync(AccessLevel accessLevel);
        Task<AccessLevel> DeleteAccessLevelAsync(AccessLevel accessLevel);
    }
}
