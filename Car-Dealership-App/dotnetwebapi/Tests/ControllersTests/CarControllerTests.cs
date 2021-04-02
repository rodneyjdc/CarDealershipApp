using System;
using Xunit;
using System.Threading.Tasks;
using Moq; // mocking framework for .NET
using dotnetwebapi.Services;
using dotnetwebapi.Models;
using dotnetwebapi.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ControllersTests
{
    public class CarControllerTests
    {   
        [Fact]
        public void ForPutAction_ReturnsBadRequestResultForNonexistentCar()
        {
            // Arrange
            var mockRepo = new Mock<IService<Car>>();
            var nonExistentCarId = 0;
            mockRepo.Setup(service => service.Update(nonExistentCarId, null))
                .Throws(new ArgumentOutOfRangeException("Could not find car by that ID."));
            var controller = new CarController(mockRepo.Object);
            

            // Act
            var result = controller.Put(nonExistentCarId, updatedCar: null);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void ForDeleteAction_ReturnsBadRequestResultForNonexistentCar()
        {
            // Arrange
            var mockRepo = new Mock<IService<Car>>();
            var nonExistentCarId = 0;
            mockRepo.Setup(service => service.Delete(nonExistentCarId))
                .Throws(new ArgumentOutOfRangeException("Could not find car by that ID."));
            var controller = new CarController(mockRepo.Object);
            

            // Act
            var result = controller.Delete(nonExistentCarId);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}
