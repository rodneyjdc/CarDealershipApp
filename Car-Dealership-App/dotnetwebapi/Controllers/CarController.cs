using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using dotnetwebapi.Services;
using dotnetwebapi.Models;

namespace dotnetwebapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : ControllerBase
    {
        private readonly IService<Car> _carService;

        public CarController(IService<Car> carService) => _carService = carService;

        [HttpGet]
        public IEnumerable<Car> Get() => _carService.GetAll();

        [HttpGet("{id}")]
        public Car Get(int id) => _carService.GetById(id);

        [HttpPost]
        public void Post([FromBody] Car newCar) => _carService.Add(newCar);

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Car updatedCar) {
            try
            {
                _carService.Update(id, updatedCar);
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
                _carService.Delete(id);
                return base.Accepted();
            }
            catch (ArgumentException exception)
            {
                
                return base.BadRequest(exception.Message);
            }
        }
    }
}