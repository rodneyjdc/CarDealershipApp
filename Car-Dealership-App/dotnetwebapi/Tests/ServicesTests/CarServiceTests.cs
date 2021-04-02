using System;
using Xunit;
using Microsoft.EntityFrameworkCore;
using dotnetwebapi.DataAccess;
using dotnetwebapi.Models;
using dotnetwebapi.Services;

namespace ServicesTests
{
    public class CarServiceTests : ServiceTest
    {
        public CarServiceTests()
                : base(
                    new DbContextOptionsBuilder<CarDealershipDbContext>()
                        .UseSqlite("Data Source=C:\\MyProjects\\LTI\\rodney_val\\CarDealershipApp\\CarDealershipDB.db")
                        .Options)
        {
        }

        [Fact]
        public void Can_Get_All_Cars()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var carService = new CarService(context);

                var cars = carService.GetAll();

                Assert.Equal(3, cars.Count);
                Assert.Equal("Valentin", cars[0].Seller);
                Assert.Equal("Vandit", cars[1].Seller);
                Assert.Equal("Rodney", cars[2].Seller);
            }
        }

        [Fact]
        public void Can_Get_Car_ById()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var carService = new CarService(context);
                int carId = 1;

                var car = carService.GetById(carId);

                Assert.NotNull(car);
                Assert.Equal("Car 1", car.Name);
            }
        }

        [Fact]
        public void Can_Add_Car()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var carService = new CarService(context);
                Car newCar = new Car()
                {
                    CarId = 4,
                    Name = "New Car",
                    Price = 5000,
                    Location = "Los Angeles",
                    Seller = "Mike",
                    Image = "",
                    Date = new DateTime(2021, 01, 01)
                };

                carService.Add(newCar);
                var cars = carService.GetAll();

                Assert.Equal(4, cars.Count);
            }
        }

        [Fact]
        public void Cannot_Add_Car_WithExistingCarId()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var carService = new CarService(context);
                Car existingCar = new Car()
                {
                    CarId = 3, 
                    Name = "Car 3", 
                    Price = 1245, 
                    Location = "Italia", 
                    Seller = "Rodney", 
                    Image = "", 
                    Date = new DateTime(2021, 01, 01)
                };

                Assert.Throws<ArgumentOutOfRangeException>(() => carService.Add(existingCar));
            }
        }

        [Fact]
        public void Can_Update_Car()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var carService = new CarService(context);
                int carId = 1;
                Car updatedCar = new Car()
                {
                    CarId = 1,
                    Name = "Updated Car",
                    Price = 2018,
                    Location = "Action",
                    Seller = "Valentin",
                    Image = "",
                    Date = new DateTime(2021, 01, 01)
                };

                carService.Update(carId, updatedCar);
                var car = carService.GetById(carId);

                Assert.NotNull(car);
                Assert.Equal("Updated Car", car.Name);
            }
        }

        [Fact]
        public void Cannot_Update_Car_WithNonExistentId()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var carService = new CarService(context);
                int nonExistentCarId = 5;
                Car updatedCar = new Car()
                {
                    CarId = 5,
                    Name = "Updated Car",
                    Price = 2018,
                    Location = "Action",
                    Seller = "Valentin",
                    Image = "",
                    Date = new DateTime(2021, 01, 01)
                };

                Assert.Throws<ArgumentOutOfRangeException>(() => carService.Update(nonExistentCarId, updatedCar));
            }
        }

        [Fact]
        public void Can_Delete_Car()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var carService = new CarService(context);
                int carId = 1;

                carService.Delete(carId);
                var cars = carService.GetAll();

                Assert.Equal(2, cars.Count);
                Assert.Equal("Car 2", cars[0].Name);
            }
        }

    }
}
