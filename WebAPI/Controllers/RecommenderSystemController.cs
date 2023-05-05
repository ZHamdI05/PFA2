using Database.BL;
using Database.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.models;

namespace WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RecommenderSystemController : ControllerBase
  {
    private readonly WebAPIDbContext _context;
    public RecommenderSystemController(WebAPIDbContext context)
    {
      _context = context;
    }

    [HttpGet("{id}")] //
    public async Task<IActionResult> GetRecommendedItems(int id)
    {
      string items = await RecommenderSystemAccessLayer.ExecuteAsync();
      var value = new IValue { Id = id,Value = items };
      

      if (items !="")
        return Ok(value);

      return NotFound();
    }
  }
}
