using System.Collections.Generic;

namespace dotnetwebapi.Services
{
    public interface IUserService
    {
        List<User> GetUsers();

        User GetUser(int id);

        void AddUser(User newUser);

        void UpdateUser(int id, User updatedUser);

        void DeleteUser(int id);
    }
}