using System;

namespace dotnetwebapi.Models
{
    public class Car
    {
        public int CarId { get; set; }
        public string Owner { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public string Color { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
        public DateTime Date { get; set; }
    }
}