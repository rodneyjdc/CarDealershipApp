using System;
using System.Collections.Generic;

namespace Car_Dealership_App
{

    class FakeData
    {
        private static readonly string[] makes = new[]
       {
            "Ford", "Nesson", "Tesla", "Toyota", "Nio"
        };

        private static readonly string[] models = new[]
        {
            "2000", "2010", "2011", "2015", "2020"
        };


        static private List<Car> cars = new List<Car>() { };
        static public List<Car> getCars()
        {
            if (cars.Count > 0)
            {
                return cars;
            }

            for (int i = 0; i < 5; i += 1)
            {
                var rand = new Random();

                var car = new Car();
                car.Owner = "Owner" + i;
                car.Make = makes[rand.Next(makes.Length)];
                car.Color = "blue";
                car.Model = models[rand.Next(models.Length)];
                car.Year = 2008;
                car.imageUrl = "https://source.unsplash.com/1600x900/?car";
                car._id = Guid.NewGuid().ToString();
                cars.Add(car);
            }

            return cars;
        }
    }
}