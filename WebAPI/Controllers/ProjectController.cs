using Database.BL;
using Database.DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace WebAPI.Controllers
{
    [Route("api/Project")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly WebAPIDbContext _context;
        private readonly IConfiguration _config;

        public ProjectController(WebAPIDbContext context, IConfiguration config) 
        {
             _context= context;
      _config=config;

        }
    [Authorize(Roles = "User")]
    [HttpGet] // Get all projects 
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
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
    //Authorize]
    [HttpPost] // Add new project 
        public async Task<IActionResult> AddProjects(Project project)
        {
            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();
            return Ok(project);
        }
    [Authorize]
    [HttpDelete("{id}")]// delete¨Project
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    [Authorize]
    [HttpPut] // Update project
        public async Task<IActionResult> UpdateProject(Project project)
        {
            var existingProject = await _context.Projects.FindAsync(project.ProjectId);

            if (existingProject == null)
            {
                return NotFound();
            }

            _context.Projects.Update(existingProject);
            await _context.SaveChangesAsync();

            return Ok(existingProject);
        }


    }
}
