using Database.BL;
using Database.BL.Resource;
using Database.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceController : ControllerBase
    {
        private readonly WebAPIDbContext _context;

        public ResourceController(WebAPIDbContext context)
        {
            _context = context;
        }

        // GET: api/Book
        [HttpGet("books")]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        // GET: api/Book/5
        [HttpGet("books/{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        // PUT: api/Book/5
        [HttpPut("books")]
        public async Task<IActionResult> UpdateBook(Book book)
        {
            var existingBook = await _context.Books.FindAsync(book.Id);

            if (existingBook == null)
            {
                return NotFound();
            }

            _context.Books.Update(existingBook);
            await _context.SaveChangesAsync();

            return Ok(existingBook);
        }

        // POST: api/Book
        [HttpPost("book")]
        public async Task<ActionResult<Book>> AddBook(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.Id }, book);
        }

        // DELETE: api/Book/5
        [HttpDelete("book/{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("article")]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {
            return await _context.Articles.ToListAsync();
        }

        [HttpGet("article/{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            return Ok(article);
        }


        [HttpPost("article")]
        public async Task<ActionResult<Article>> PostArticle(Article article)
        {
            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetArticle), new { id = article.Id }, article);
        }

        [HttpPut("article")]
        public async Task<IActionResult> UpdateArticle(Article article)
        {
            var existingArticle = await _context.Articles.FindAsync(article.Id);

            if (existingArticle == null)
            {
                return NotFound();
            }

            _context.Articles.Update(existingArticle);
            await _context.SaveChangesAsync();

            return Ok(existingArticle);
        }

        [HttpDelete("article/{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("webinars")]
        public async Task<IActionResult> GetAll()
        {
            var webinars = await _context.Webinars.ToListAsync();
            return Ok(webinars);
        }


        [HttpGet("webinars/{id}")]
        public async Task<IActionResult> GetWebinar(int id)
        {
            var webinar = await _context.Webinars.FindAsync(id);

            if (webinar == null)
            {
                return NotFound();
            }
            return Ok(webinar);
        }


        [HttpPost("webinars")]
        public async Task<ActionResult<Webinar>> AddWebinar(Webinar webinar)
        {
            _context.Webinars.Add(webinar);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWebinar), new { id = webinar.Id }, webinar);
        }

        [HttpPut("webinars")]
        public async Task<IActionResult> UpdateWebinar(Webinar webinar)
        {
            var existingWebinar = await _context.Webinars.FindAsync(webinar.Id);

            if (existingWebinar == null)
            {
                return NotFound();
            }

            _context.Webinars.Update(existingWebinar);
            await _context.SaveChangesAsync();

            return Ok(existingWebinar);
        }

        [HttpDelete("webinar/{id}")]
        public async Task<IActionResult> DeleteWebinar(int id)
        {
            var webinar = await _context.Webinars.FindAsync(id);
            if (webinar == null)
            {
                return NotFound();
            }

            _context.Webinars.Remove(webinar);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}
