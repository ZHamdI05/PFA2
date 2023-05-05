using Database.BL;
using Database.DAL;
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

        public ProjectController(WebAPIDbContext context) 
        {
             _context= context;
             ExportCSV.Export("Projects","projects.csv");
             ExportCSV.Export("Ratings","ratings.csv");
        }

        [HttpGet] // Get all projects 
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        [HttpGet("{id}")] // Get project by Id
        public async Task<IActionResult> GetProjects(int id)
        {
            
            var project = await _context.Projects.FindAsync(id);

            if(project !=null)
                return Ok(project);

            return NotFound();
        }

        [HttpPost] // Add new project 
        public async Task<IActionResult> AddProjects(Project project)
        {
            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();
            return Ok(project);
        }

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
