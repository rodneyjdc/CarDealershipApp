using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using dotnetwebapi.DataAccess;
using dotnetwebapi.Models;

namespace dotnetwebapi.Services
{
    public class CarService : IService<Car>
    {
         private readonly CarDealershipDbContext _db;

        public CarService(CarDealershipDbContext db)
        {
            _db = db;
        }

        public List<Car> GetAll() => _db.Cars.ToList();
        public Car GetById(int id) => _db.Cars.FirstOrDefault(car => car.CarId == id);

        public void Add(Car newCar)
        {
            if (_db.Cars.Any(car => car.CarId == newCar.CarId))
            {
                throw new ArgumentOutOfRangeException("Car id already in use.");
            }
            _db.Cars.Add(newCar);
            _db.SaveChanges();
        }

        public void Update(int id, Car updatedCar)
        {
            if (_db.Cars.Any(car => car.CarId == id))
            {
                var carToUpdate = _db.Cars.First(car => car.CarId == id);
                carToUpdate.Name = updatedCar.Name;
                carToUpdate.Price = updatedCar.Price;
                carToUpdate.Location = updatedCar.Seller;
                carToUpdate.Image = updatedCar.Image;
                carToUpdate.Date = updatedCar.Date;
                _db.SaveChanges();
            }
            else
            {
                throw new ArgumentOutOfRangeException("Could not find car by that ID.");
            }
        }

        public void Delete(int id)
        {
            if (_db.Cars.Any(car => car.CarId == id))
            {
                var carToDelete = _db.Cars.First(car => car.CarId == id);
                _db.Cars.Remove(carToDelete);
                _db.SaveChanges();
            }
            else
            {
                throw new ArgumentOutOfRangeException("Could not find car by that ID.");
            }
        }
    }
}