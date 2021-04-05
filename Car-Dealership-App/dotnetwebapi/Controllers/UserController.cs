using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using dotnetwebapi.Services;

namespace dotnetwebapi.Controllers
{
    [ApiController]
    [Route("dotnetApi/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IService<User> _userService;

        public UserController(IService<User> userService) => _userService = userService;

        [HttpGet]
        public IEnumerable<User> Get() => _userService.GetAll();

        [HttpGet("{id}")]
        public User Get(int id) => _userService.GetById(id);

        [HttpPost]
        public void Post([FromBody] User newUser) => _userService.Add(newUser);

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User updatedUser) {
            try
            {
                _userService.Update(id, updatedUser);
                return Accepted();
            }
            catch (ArgumentOutOfRangeException exception)
            {
                return base.BadRequest(exception.Message);
            }
            
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id){
            try
            {
                _userService.Delete(id);
                return base.Accepted();
            }
            catch (ArgumentException exception)
            {
                
                return base.BadRequest(exception.Message);
            }
        }
        
    }
}
