using BeSpoke.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BeSpoke.Models
{
    public class SaleViewModel
    {
        public Product Product { get; set; }
        public Customer Customer { get; set; }
        public DateTime SaleDate { get; set; }
        public int SalesPersonId { get; set; }
        public int QtySold { get; set; }
    }
}