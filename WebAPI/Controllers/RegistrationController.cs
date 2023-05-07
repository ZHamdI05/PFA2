using Database.BL;
using Database.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RegistrationController : ControllerBase
  {
    private readonly WebAPIDbContext _context;

    public RegistrationController(WebAPIDbContext context)
    {
      _context= context;
    }

    [HttpPost]
    public async Task<IActionResult> Register(User user)
    {
      if(user.Email == null && user.Password ==null) {
        return BadRequest("Email or Pasword is empty");
      }
      User userWithEmail = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
      if (userWithEmail == null)
      {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return Ok(user);
      }
      return BadRequest("Email already in use");

    }


  }
}
