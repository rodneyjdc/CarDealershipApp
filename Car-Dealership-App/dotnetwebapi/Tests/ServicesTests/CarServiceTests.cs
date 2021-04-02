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
            }
        }

    }
}
