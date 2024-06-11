using SafeCargo.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SafeCargo.Server.Interfaces
{
    public interface IAccessLevelService
    {
        Task<IEnumerable<AccessLevel>> GetAllAccessLevelsAsync();
        Task<AccessLevel> GetAccessLevelByCodAsync(string codLevel);
        Task<AccessLevel> CreateAccessLevelAsync(AccessLevel accessLevel);
        Task<AccessLevel> UpdateAccessLevelAsync(AccessLevel accessLevel);
        Task<bool> DeleteAccessLevelAsync(string codLevel);
    }
}
