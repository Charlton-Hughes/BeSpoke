using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeSpoke.Entities.Model
{
    public class QuarterlyCommissionDTO
    {
        public string SalesPerson { get; set; }
        public decimal? Q1Commission { get; set; }
        public decimal? Q2Commission { get; set; }
        public decimal? Q3Commission { get; set; }
        public decimal? Q4Commission { get; set; }
    }
}
