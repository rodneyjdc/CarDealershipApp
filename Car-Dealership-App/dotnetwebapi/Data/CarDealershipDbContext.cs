
using Microsoft.EntityFrameworkCore;

namespace dotnetwebapi.Data
{
    public class CarDealershipDbContext : DbContext
    {
        public CarDealershipDbContext(DbContextOptions<CarDealershipDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set;}
    }
}