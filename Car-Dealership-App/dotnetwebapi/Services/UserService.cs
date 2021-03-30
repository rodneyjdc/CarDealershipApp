using System;
using System.Collections.Generic;
using System.Linq;
using dotnetwebapi.DataAccess;

namespace dotnetwebapi.Services
{
    public class UserService : IService<User>
    {
         private readonly CarDealershipDbContext _db;

        public UserService(CarDealershipDbContext db)
        {
            _db = db;
        }

        public List<User> GetAll() => _db.Users.ToList();
        public User GetById(int id) => _db.Users.FirstOrDefault(user => user.UserId == id);

        public void Add(User newUser)
        {
            if (_db.Users.Any(user => user.UserId == newUser.UserId))
            {
                throw new ArgumentOutOfRangeException("User id already in use.");
            }
            _db.Users.Add(newUser);
            _db.SaveChanges();
        }

        public void Update(int id, User updatedUser)
        {
            if (_db.Users.Any(user => user.UserId == id))
            {
                var userToUpdate = _db.Users.First(user => user.UserId == id);
                userToUpdate.Email = updatedUser.Email;
                userToUpdate.FirstName = updatedUser.FirstName;
                userToUpdate.LastName = updatedUser.LastName;
                userToUpdate.Username = updatedUser.Username;
                userToUpdate.Password = updatedUser.Password;
                userToUpdate.Role = updatedUser.Role;
                _db.SaveChanges();
            }
            else
            {
                throw new ArgumentOutOfRangeException("Could not find user by that ID.");
            }
        }

        public void Delete(int id)
        {
            if (_db.Users.Any(user => user.UserId == id))
            {
                var userToDelete = _db.Users.First(user => user.UserId == id);
                _db.Users.Remove(userToDelete);
                _db.SaveChanges();
            }
            else
            {
                throw new ArgumentOutOfRangeException("Could not find user by that ID.");
            }
        }
    }
}