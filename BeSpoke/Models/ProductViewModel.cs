using BeSpoke.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeSpoke.Models
{
    public class ProductViewModel
    {
        public List<SalesPerson> SalesPersons { get; set; }
        public List<Customer> Customers { get; set; }
    }
}