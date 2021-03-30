using System;

namespace dotnetwebapi.Models
{
    public class Car
    {
        public int CarId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }

        public string Location { get; set; }

        public string Seller { get; set; }

        public string Image { get; set; }

        public DateTime Date { get; set; }

    }
}