using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeCargo.Server.DTOs;
using SafeCargo.Server.Interfaces;
using SafeCargo.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SafeCargo.Server.Controllers
{
    [Authorize(Roles = "ADMIN")] // Adiciona a política de autorização padrão para todos os métodos do controlador
    [Route("api/[controller]")]
    [ApiController]
    public class AccessLevelController : ControllerBase
    {
        private readonly IAccessLevelService _accessLevelService;

        /// <summary>
        /// Construtor do AccessLevelController.
        /// </summary>
        /// <param name="accessLevelService">O serviço para gerenciar os níveis de acesso.</param>
        public AccessLevelController(IAccessLevelService accessLevelService)
        {
            _accessLevelService = accessLevelService;
        }

        /// <summary>
        /// Obtém todos os níveis de acesso.
        /// </summary>
        /// <returns>Uma lista de níveis de acesso.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccessLevelDTO>>> GetAll()
        {
            var accessLevels = await _accessLevelService.GetAllAccessLevelsAsync();
            var accessLevelDTOs = new List<AccessLevelDTO>();

            foreach (var accessLevel in accessLevels)
            {
                accessLevelDTOs.Add(new AccessLevelDTO
                {
                    CodLevel = accessLevel.CodLevel,
                    DescLevel = accessLevel.DescLevel,
                    Description = accessLevel.Description
                });
            }

            return Ok(accessLevelDTOs);
        }

        /// <summary>
        /// Obtém um nível de acesso pelo código.
        /// </summary>
        /// <param name="codLevel">O código do nível de acesso.</param>
        /// <returns>O nível de acesso correspondente ao código.</returns>
        [HttpGet("{codLevel}")]
        public async Task<ActionResult<AccessLevelDTO>> GetByCodLevel(string codLevel)
        {
            var accessLevel = await _accessLevelService.GetAccessLevelByCodAsync(codLevel);

            if (accessLevel == null)
            {
                return NotFound();
            }

            var accessLevelDTO = new AccessLevelDTO
            {
                CodLevel = accessLevel.CodLevel,
                DescLevel = accessLevel.DescLevel,
                Description = accessLevel.Description
            };

            return Ok(accessLevelDTO);
        }

        /// <summary>
        /// Cria um novo nível de acesso.
        /// </summary>
        /// <param name="accessLevelDTO">Os dados do nível de acesso a ser criado.</param>
        /// <returns>O nível de acesso criado.</returns>
        [HttpPost]
        public async Task<ActionResult<AccessLevelDTO>> Create(AccessLevelDTO accessLevelDTO)
        {
            var accessLevel = new AccessLevel
            {
                CodLevel = accessLevelDTO.CodLevel,
                DescLevel = accessLevelDTO.DescLevel,
                Description = accessLevelDTO.Description,
                CreatedAt = DateTime.UtcNow
            };

            var createdAccessLevel = await _accessLevelService.CreateAccessLevelAsync(accessLevel);

            return CreatedAtAction(nameof(GetByCodLevel), new { codLevel = createdAccessLevel.CodLevel }, accessLevelDTO);
        }

        /// <summary>
        /// Atualiza um nível de acesso existente.
        /// </summary>
        /// <param name="codLevel">O código do nível de acesso a ser atualizado.</param>
        /// <param name="accessLevelDTO">Os dados atualizados do nível de acesso.</param>
        /// <returns>O nível de acesso atualizado.</returns>
        [HttpPut]
        public async Task<IActionResult> Update(AccessLevelDTO accessLevelDTO)
        {
            var existingAccessLevel = await _accessLevelService.GetAccessLevelByCodAsync(accessLevelDTO.CodLevel);

            if (existingAccessLevel == null)
            {
                return NotFound();
            }

            existingAccessLevel.DescLevel = accessLevelDTO.DescLevel;
            existingAccessLevel.Description = accessLevelDTO.Description;
            existingAccessLevel.UpdatedAt = DateTime.UtcNow;

            await _accessLevelService.UpdateAccessLevelAsync(existingAccessLevel);

            return Ok(existingAccessLevel);
        }

        /// <summary>
        /// Exclui um nível de acesso existente.
        /// </summary>
        /// <param name="codLevel">O código do nível de acesso a ser excluído.</param>
        /// <returns>O resultado da exclusão.</returns>
        [HttpDelete("{codLevel}")]
        public async Task<IActionResult> Delete(string codLevel)
        {
            var result = await _accessLevelService.DeleteAccessLevelAsync(codLevel);

            if (!result)
            {
                var accessLevel = await _accessLevelService.GetAccessLevelByCodAsync(codLevel);
                if (accessLevel == null)
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest(new { Message = "O nível de acesso está em uso e não pode ser excluído." });
                }
            }

            return NoContent();
        }
    }
}
