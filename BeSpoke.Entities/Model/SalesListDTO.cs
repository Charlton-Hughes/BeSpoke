using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeSpoke.Entities.Model
{
    public class SalesListDTO
    {
        // Price, Salesperson, and Salesperson Commission
        public Sale Sale { get; set; }
        public Product Product { get; set; }
        public Customer Customer { get; set; }
        public SalesPerson SalesPerson { get; set; }
        public Discount Discount { get; set; }
    }
}
