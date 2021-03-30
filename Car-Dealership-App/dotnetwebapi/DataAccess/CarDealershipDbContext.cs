using Microsoft.EntityFrameworkCore;
using dotnetwebapi.Models;

namespace dotnetwebapi.DataAccess
{
    public class CarDealershipDbContext : DbContext
    {
        public CarDealershipDbContext(DbContextOptions<CarDealershipDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set;}
        public DbSet<Car> Cars { get; set;}
    }
}