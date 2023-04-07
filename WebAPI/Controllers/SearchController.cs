using Database.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly WebAPIDbContext _context;

        public SearchController(WebAPIDbContext context)
        {
            _context = context;
        }

        [HttpGet("userSearch={searchText}")]
        public IActionResult SearchUsers(string searchText)
        {
            var users = _context.Users
                .Where(u => u.FirstName.Contains(searchText) || u.LastName.Contains(searchText))
                .ToList();


            if(users.Count > 0)
            {
                return Ok(users);
            }
            return NotFound();
            
        }

        [HttpGet("{searchText}")]
        public IActionResult SearchProject(string searchText)
        {
            var projects = _context.Projects
                .Where(p => p.Description.Contains(searchText) || p.ProjectName.Contains(searchText))
                .ToList();


            if (projects.Count > 0)
            {
                return Ok(projects);
            }
            return NotFound();

        }

        



    }
}
