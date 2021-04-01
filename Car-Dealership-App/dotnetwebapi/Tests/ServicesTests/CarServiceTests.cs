using System;
using Xunit;
using Microsoft.EntityFrameworkCore;
using dotnetwebapi.DataAccess;
using dotnetwebapi.Models;
using dotnetwebapi.Services;

namespace ServicesTests
{
    public class CarServiceTests
    {
        [Fact]
        public void GetAllTest()
        {
            var options = new DbContextOptionsBuilder<CarDealershipDbContext>()
            .UseInMemoryDatabase(databaseName: "CarDealershipDatabase")
            .Options;

        // Insert seed data into the database using one instance of the context
        using (var context = new CarDealershipDbContext(options))
        {
            context.Cars.Add(new Car {CarId = 1, Name = "Car 1", Price = 2018, Location = "Action", Seller = "Valentin", Image = "", Date = new DateTime().Now });
            context.Cars.Add(new Car {CarId = 2, Name = "Car 2", Price = 6000, Location = "Maryland", Seller = "Vandit", Image = "", Date = new DateTime().Now });
            context.Cars.Add(new Car {CarId = 3, Name = "Car 3", Price = 1245, Location = "Italia", Seller = "Rodney", Image = "", Date = new DateTime().Now });
            context.SaveChanges();
        }

        // Use a clean instance of the context to run the test
        using (var context = new CarDealershipDbContext(options))
        {
            CarService carRepository = new CarService(context);
            List<Cars> cars = CarService.GetAll();

            Assert.Equal(3, cars.Count);
        }

        }
    }
}
