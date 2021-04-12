using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeSpoke.Entities.Model
{
    [Table("dbo.Discount")]
    public class Discount
    {
        [Key]
        public int DiscountId { get; set; } //(int, not null)
        [Required]
        public int ProductId { get; set; } //(int, not null)
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        [Required]
        public DateTime BeginDate { get; set; } //(date, not null)
        [Required]
        public DateTime EndDate { get; set; } //(date, not null)
        public decimal DiscountPercentage { get; set; } //(decimal(2,2), not null)

        [NotMapped]
        public string BeginDateString
        {
            get
            {
                return this.BeginDate.ToShortDateString();
            }
        }
        [NotMapped]
        public string EndDateString
        {
            get
            {
                return this.EndDate.ToShortDateString();
            }
        }
    }
}
