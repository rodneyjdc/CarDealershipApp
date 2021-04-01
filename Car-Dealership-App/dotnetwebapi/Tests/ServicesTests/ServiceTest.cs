using Microsoft.EntityFrameworkCore;
using dotnetwebapi.DataAccess;
using dotnetwebapi.Models;
using System;

namespace ServicesTests
{
    public class ServiceTest
    {
        protected ServiceTest(DbContextOptions<CarDealershipDbContext> contextOptions)
        {
            ContextOptions = contextOptions;

            Seed();
        }

        protected DbContextOptions<CarDealershipDbContext> ContextOptions { get; }

        private void Seed()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                context.Cars.Add(new Car { 
                    CarId = 1, 
                    Name = "Car 1", 
                    Price = 2018, 
                    Location = "Action", 
                    Seller = "Valentin", 
                    Image = "", 
                    Date = new DateTime(2021, 01, 01) });
                
                context.Cars.Add(new Car { 
                    CarId = 2, 
                    Name = "Car 2", 
                    Price = 6000, 
                    Location = "Maryland", 
                    Seller = "Vandit", 
                    Image = "", 
                    Date = new DateTime(2021, 01, 01) });

                context.Cars.Add(new Car { 
                    CarId = 3, 
                    Name = "Car 3", 
                    Price = 1245, 
                    Location = "Italia", 
                    Seller = "Rodney", 
                    Image = "", 
                    Date = new DateTime(2021, 01, 01) });

                context.SaveChanges();
            }
        }
    }
}
