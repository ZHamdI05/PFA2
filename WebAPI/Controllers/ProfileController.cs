using Database.BL;
using Database.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ProfileController : ControllerBase
    {
        private readonly WebAPIDbContext _context;

        public ProfileController(WebAPIDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetUser(int id)
        {
            var applicationUser = await _context.Users.FindAsync(id);

            if (applicationUser == null)
            {
                return NotFound();
            }

            return applicationUser;
        }

        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> AddUser(ApplicationUser applicationUser)
        {
            _context.Users.Add(applicationUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = applicationUser.ID }, applicationUser);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(ApplicationUser applicationUser)
        {

           
                var existingUser = await _context.Users.FindAsync(applicationUser.ID);

                if (existingUser == null)
                {
                    return NotFound();
                }

                _context.Users.Update(existingUser);
                await _context.SaveChangesAsync();
                return Ok(existingUser);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var applicationUser = await _context.Users.FindAsync(id);
            if (applicationUser == null)
            {
                return NotFound();
            }
            _context.Users.Remove(applicationUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.ID == id);
        }
    }

}
