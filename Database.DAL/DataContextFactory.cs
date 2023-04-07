using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Database.DAL;

namespace MySite.DAL
{
    public class DataContextFactory : IDesignTimeDbContextFactory<WebAPIDbContext>
    {
        public WebAPIDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<WebAPIDbContext>();
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=FEKIRTIDatabase;Trusted_Connection=True;MultipleActiveResultSets=true");
            return new WebAPIDbContext(optionsBuilder.Options);
        }
    }
}