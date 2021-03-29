using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace dotnetwebapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                string allText = System.IO.File.ReadAllText(@".\Data\users.json");
                object jsonObject = JsonSerializer.Deserialize<IEnumerable<User>>(allText);
                return StatusCode(200, jsonObject);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("usernames/")]
        public IActionResult GetUsernames()
        {
            try
            {
                string allText = System.IO.File.ReadAllText(@".\Data\users.json");
                var jsonObjects = JsonSerializer.Deserialize<IEnumerable<User>>(allText);

                List<String> usernames = jsonObjects.Select(user => user.username).ToList();

                return StatusCode(200, usernames);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        // [Route("/")]
        public IActionResult Post(User newUser) {
            if (ModelState.IsValid) {
                try
                {
                    string allText = System.IO.File.ReadAllText(@".\Data\users.json");
                    List<User> users = JsonSerializer.Deserialize<IEnumerable<User>>(allText).ToList();
                    
                    if (!(users.Exists(user => user.id == newUser.id))) {
                        users.Add(newUser);

                        var usersString = JsonSerializer.Serialize(users);
                        System.IO.File.WriteAllText(@".\Data\users.json", usersString);

                        return StatusCode(200, users);
                    } else {
                        return StatusCode(500, "User already exists.");
                    }

                }
                catch (Exception e)
                {
                    return StatusCode(500, e.Message);
                }
            }
            return StatusCode(500, "Model or data is not valid.");
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Put(int id, User newUser) 
        {
            if (ModelState.IsValid) {
                try
                {
                    if(id != newUser.id) {
                        return StatusCode(500, "wrong user.");
                    } 
                    else{
                        string allText = System.IO.File.ReadAllText(@".\Data\users.json");
                        List<User> users = JsonSerializer.Deserialize<IEnumerable<User>>(allText).ToList();
                        List<int> Ids = users.Select(user => user.id).ToList();

                        if (Ids.Exists(x => x == id)) {                                                   
                            int indexOfExistingUser = Ids.IndexOf(id);              
                            users[indexOfExistingUser]  = newUser;

                            var usersString = JsonSerializer.Serialize(users);
                            System.IO.File.WriteAllText(@".\Data\users.json", usersString);

                            return StatusCode(200, users);
                        } else {
                            return StatusCode(500, "User does not exist.");
                        }
                    }
                }
                catch (Exception e)
                {
                    return StatusCode(500, e.Message);
                }
            }
            return StatusCode(500, "Model or data is not valid.");
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id) 
        {
            if (ModelState.IsValid) {
                try
                {
                    string allText = System.IO.File.ReadAllText(@".\Data\users.json");
                    List<User> users = JsonSerializer.Deserialize<IEnumerable<User>>(allText).ToList();
                    List<int> Ids = users.Select(user => user.id).ToList();

                    if (Ids.Exists(x => x == id)) {                                                   
                        int indexOfExistingUser = Ids.IndexOf(id);              
                        users.Remove(users[indexOfExistingUser]);

                        var usersString = JsonSerializer.Serialize(users);
                        System.IO.File.WriteAllText(@".\Data\users.json", usersString);

                        return StatusCode(200, users);
                    } else {
                        return StatusCode(500, "User does not exist.");
                    }
                }
                catch (Exception e)
                {
                    return StatusCode(500, e.Message);
                }
            }
            return StatusCode(500, "Model or data is not valid.");
        }
    }
}
