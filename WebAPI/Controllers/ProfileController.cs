using Database.BL;
using Database.DAL;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [HttpGet("{id}")] // Get project by Id
        public async Task<IActionResult> GetProjects(int id)
        {
            
            var project = await _context.Projects.FindAsync(id);

            if(project !=null)
                return Ok(project);

            return NotFound();
        }
    [Authorize]
    [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var applicationUser = await _context.Users.FindAsync(id);

            if (applicationUser == null)
            {
                return NotFound();
            }

            return applicationUser;
        }
    [Authorize]
    [HttpPost]
        public async Task<ActionResult<User>> AddUser(User applicationUser)
        {
            _context.Users.Add(applicationUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = applicationUser.ID }, applicationUser);
        }
    [Authorize]
    [HttpPut]
        public async Task<IActionResult> UpdateUser(User applicationUser)
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
    [Authorize]
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
