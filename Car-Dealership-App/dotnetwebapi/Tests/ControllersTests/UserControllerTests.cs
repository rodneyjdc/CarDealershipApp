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
    public class UserControllerTests
    {   
        [Fact]
        public void ForPutAction_ReturnsBadRequestResultForNonexistentUser()
        {
            // Arrange
            var mockRepo = new Mock<IService<User>>();
            var nonExistentUserId = 0;
            mockRepo.Setup(service => service.Update(nonExistentUserId, null))
                .Throws(new ArgumentOutOfRangeException("Could not find user by that ID."));
            var controller = new UserController(mockRepo.Object);
            

            // Act
            var result = controller.Put(nonExistentUserId, updatedUser: null);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void ForDeleteAction_ReturnsBadRequestResultForNonexistentUser()
        {
            // Arrange
            var mockRepo = new Mock<IService<User>>();
            var nonExistentUserId = 0;
            mockRepo.Setup(service => service.Delete(nonExistentUserId))
                .Throws(new ArgumentOutOfRangeException("Could not find user by that ID."));
            var controller = new UserController(mockRepo.Object);
            

            // Act
            var result = controller.Delete(nonExistentUserId);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}
