using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeSpoke.Entities.Model
{
    [Table("dbo.Sale")]
    public class Sale
    {
        [Key]
        public int SaleId { get; set; } //(int, not null)
        [Required]
        public int ProductId { get; set; } //(int, not null)
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        [Required]
        public int SalesPersonId { get; set; } //(int, not null)
        [ForeignKey("SalesPersonId")]
        public SalesPerson SalesPerson { get; set; }
        [Required]
        public int CustomerId { get; set; } //(int, not null)
        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }
        [Required]
        public DateTime Date { get; set; } //(datetime, not null)

        [NotMapped]
        public string SaleDateString
        {
            get
            {
                return this.Date.ToShortDateString();
            }
        }
    }

}
