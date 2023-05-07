using Database.BL;
using Database.DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Models;

namespace WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class LoginController : ControllerBase
  {

    private readonly IConfiguration _config;
    private readonly WebAPIDbContext _context;

    public LoginController(IConfiguration config, WebAPIDbContext context)
    {
      _config = config;
      _context = context;
    }

    [AllowAnonymous]
    [HttpPost]

    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
      if (model == null)
      {
        return BadRequest("Invalid client request Check email and password");
      }

      // Authenticate the user
      var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == model.Email && u.Password == model.Password);
      if (user == null)
      {
        return Unauthorized();
      }

      // Create claims for the user
      var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
        new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

      // Create a security key and signing credentials
      var keyString = _config["Jwt:Key"];
      if (keyString == null)
      {
        return BadRequest("Invalid client request");
      }

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      // Create a JWT token
      var token = new JwtSecurityToken(
          issuer: _config["Jwt:Issuer"],
          audience: _config["Jwt:Audience"],
          claims: claims,
          expires: DateTime.UtcNow.AddMinutes(30),
          signingCredentials: creds
      );

      return Ok(new
      {
        access_token = new JwtSecurityTokenHandler().WriteToken(token),
        token_type = "Bearer",
        expires_in = token.ValidTo,
        user
      });
    }
  }
}
