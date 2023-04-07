using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Database.BL;
using System.Resources;
using Database.BL.Resource;

namespace Database.DAL
{
    public class WebAPIDbContext:DbContext
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Webinar> Webinars { get; set; }
        public DbSet<Contact> Contacts { get; set; }

        public DbSet<Rating> Ratings { get; set; }

        public DbSet<ApplicationUser> Users { get; set; }


        public WebAPIDbContext(DbContextOptions<WebAPIDbContext> options) : base(options)
        {
        }



    }
}
