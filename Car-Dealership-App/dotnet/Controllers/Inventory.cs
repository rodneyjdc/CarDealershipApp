﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Car_Dealership_App.Controllers
{
    [ApiController]    
    public class InventoryController : ControllerBase
    {   private readonly ILogger<InventoryController> _logger;

        public InventoryController(ILogger<InventoryController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("api/Inventory")] 
        public IEnumerable<Car> Get()
        {
            
            var myCars = FakeData.getCars();
            // var lauraCar = new Car();
            //     lauraCar.Owner = "Laura";
            //     lauraCar.Make = "Toyota";
            //     lauraCar.Color = "blue";
            //     lauraCar.Model = "2001";
            //     lauraCar.Year = 2020;
            //     lauraCar.imageUrl = "https://source.unsplash.com/1600x900/?car";
            //     lauraCar._id = Guid.NewGuid().ToString();
            // myCars.add(lauraCar);
            return myCars;
        }

       /*  [HttpPost]
        [Route("api/add")] 
        public IEnumerable<Car> post(Car car)
        {
             
        } */

    }
}
