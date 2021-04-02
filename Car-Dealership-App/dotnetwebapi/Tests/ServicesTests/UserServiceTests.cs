using System;
using Xunit;
using Microsoft.EntityFrameworkCore;
using dotnetwebapi.DataAccess;
using dotnetwebapi.Models;
using dotnetwebapi.Services;

namespace ServicesTests
{
    public class UserServiceTests : ServiceTest
    {
        public UserServiceTests()
                : base(
                    new DbContextOptionsBuilder<CarDealershipDbContext>()
                        .UseSqlite("Data Source=C:\\Users\\Rodney\\Desktop\\LTI Resources\\training projects\\CarDealershipApp\\Car-Dealership-App\\dotnetwebapi\\Sqlite\\CarDealershipTestDB2.db")
                        .Options)
        {
        }

        [Fact]
        public void Can_Get_All_Users()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var userService = new UserService(context);

                var users = userService.GetAll();

                Assert.Equal(3, users.Count);
                Assert.Equal("Rodney", users[0].FirstName);
                Assert.Equal("Valentin", users[1].FirstName);
                Assert.Equal("Vandit", users[2].FirstName);
            }
        }

        [Fact]
        public void Can_Get_User_ById()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var userService = new UserService(context);
                int userId = 1;

                var user = userService.GetById(userId);

                Assert.NotNull(user);
                Assert.Equal("Rodney", user.FirstName);
            }
        }

        [Fact]
        public void Can_Add_User()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var userService = new UserService(context);
                User newUser = new User()
                {
                    UserId = 4,
                    FirstName = "Fang", 
                    LastName = "H", 
                    Email = "Fang@gmail.com", 
                    Username = "fangh", 
                    Password = "password", 
                    Role = "user"
                };

                userService.Add(newUser);
                var users = userService.GetAll();

                Assert.Equal(4, users.Count);
            }
        }

        [Fact]
        public void Cannot_Add_User_WithExistingUserId()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var userService = new UserService(context);
                User existingUser = new User()
                {
                    UserId = 3, 
                    FirstName = "Vandit", 
                    LastName = "A", 
                    Email = "vandit@gmail.com", 
                    Username = "vandita", 
                    Password = "password", 
                    Role = "user"
                };

                Assert.Throws<ArgumentOutOfRangeException>(() => userService.Add(existingUser));
            }
        }

        [Fact]
        public void Can_Update_User()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var userService = new UserService(context);
                int userId = 1;
                User updatedUser = new User()
                {
                    UserId = 1,
                    FirstName = "Rodney", 
                    LastName = "C", 
                    Email = "rodney@gmail.com", 
                    Username = "foodLover", 
                    Password = "password", 
                    Role = "admin"
                };

                userService.Update(userId, updatedUser);
                var user = userService.GetById(userId);

                Assert.NotNull(user);
                Assert.Equal("foodLover", user.Username);
            }
        }

        [Fact]
        public void Cannot_Update_User_WithNonExistentId()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var userService = new UserService(context);
                int nonExistentUserId = 5;
                User updatedUser = new User()
                {
                    UserId = 5,
                    FirstName = "Rodney", 
                    LastName = "C", 
                    Email = "rodney@gmail.com", 
                    Username = "foodLover", 
                    Password = "password", 
                    Role = "admin"
                };

                Assert.Throws<ArgumentOutOfRangeException>(() => userService.Update(nonExistentUserId, updatedUser));
            }
        }

        [Fact]
        public void Can_Delete_User()
        {
            using (var context = new CarDealershipDbContext(ContextOptions))
            {
                var userService = new UserService(context);
                int userId = 1;

                userService.Delete(userId);
                var users = userService.GetAll();

                Assert.Equal(2, users.Count);
                Assert.Equal("Valentin", users[0].FirstName);
            }
        }
    }
}
