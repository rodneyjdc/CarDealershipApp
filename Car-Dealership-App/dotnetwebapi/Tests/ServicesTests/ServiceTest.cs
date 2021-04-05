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

                // --------------------------------------------------------
                // Seed data for cars
                
                context.Cars.Add(new Car { 
                    CarId = 2, 
                    Make = "Car 1", 
                    Model = "Car 1", 
                    Year = 2000,
                    Color = "blue",
                    Price = 6000, 
                    Owner = "Valentin", 
                    Image = "", 
                    Date = new DateTime(2021, 01, 01) });

                context.Cars.Add(new Car { 
                    CarId = 2, 
                    Make = "Car 2", 
                    Model = "Car 2", 
                    Year = 2000,
                    Color = "blue",
                    Price = 6000, 
                    Owner = "Vandit", 
                    Image = "", 
                    Date = new DateTime(2021, 01, 01) });

                context.Cars.Add(new Car { 
                    CarId = 2, 
                    Make = "Car 2", 
                    Model = "Car 2", 
                    Year = 2000,
                    Color = "blue",
                    Price = 6000, 
                    Owner = "Rodney", 
                    Image = "", 
                    Date = new DateTime(2021, 01, 01) });

                
                // --------------------------------------------------------
                // Seed data for users

                context.Users.Add(new User { 
                    UserId = 1, 
                    FirstName = "Rodney", 
                    LastName = "C", 
                    Email = "rodney@gmail.com", 
                    Username = "rodneyc", 
                    Password = "password", 
                    Role = "admin"});
                
                context.Users.Add(new User { 
                    UserId = 2, 
                    FirstName = "Valentin", 
                    LastName = "E", 
                    Email = "valentin@gmail.com", 
                    Username = "valentine", 
                    Password = "password", 
                    Role = "user"});

                context.Users.Add(new User { 
                    UserId = 3, 
                    FirstName = "Vandit", 
                    LastName = "A", 
                    Email = "vandit@gmail.com", 
                    Username = "vandita", 
                    Password = "password", 
                    Role = "user"});

                context.SaveChanges();
            }
        }
    }
}
