using Database.BL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  public class UserController : ControllerBase
  {

    [HttpGet("Admins")]
    [Authorize(Roles = "Administrator")]
    public IActionResult AdminsEndpoint()
    {
      var currentUser = GetCurrentUser();

      return Ok($"Hi {currentUser.FirstName}, you are an {currentUser.Role}");
    }


    [HttpGet("Sellers")]
    [Authorize(Roles = "Seller")]
    public IActionResult SellersEndpoint()
    {
      var currentUser = GetCurrentUser();

      return Ok($"Hi {currentUser.FirstName}, you are a {currentUser.Role}");
    }

    [HttpGet("AdminsAndSellers")]
    [Authorize(Roles = "Administrator,Seller")]
    public IActionResult AdminsAndSellersEndpoint()
    {
      var currentUser = GetCurrentUser();

      return Ok($"Hi {currentUser.FirstName}, you are an {currentUser.Role}");
    }

    [HttpGet("Public")]
    public IActionResult Public()
    {
      return Ok("Hi, you're on public property");
    }

    private User GetCurrentUser()
    {
      var identity = HttpContext.User.Identity as ClaimsIdentity;

      if (identity != null)
      {
        var userClaims = identity.Claims;

        return new User
        {
          //FirstName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
          Email = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
          FirstName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.GivenName)?.Value,
          LastName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Surname)?.Value,
          Role = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value
        };
      }
      return null;
    }
  }
}
