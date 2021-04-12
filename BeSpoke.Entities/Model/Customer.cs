using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeSpoke.Entities.Model
{
    [Table("dbo.Customer")]
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; } //(int, not null)
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } //(nvarchar(50), not null)
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } //(nvarchar(50), not null)
        [Required]
        [MaxLength(200)]
        public string StreetAddress { get; set; } //(nvarchar(200), not null)
        [Required]
        [MaxLength(50)]
        public string City { get; set; } //(nvarchar(50), not null)
        [Required]
        [MaxLength(2)]
        public string State { get; set; } //(nvarchar(2), not null)
        [Required]
        public int ZipCode { get; set; } //(int, not null)
        public DateTime StartDate { get; set; } //(date, not null)

        [NotMapped]
        public string StartDateString
        {
            get
            {
                return this.StartDate.ToShortDateString();
            }
        }

        [NotMapped]
        public string CustomerName
        {
            get
            {
                return string.Format($"{this.LastName}, {this.FirstName}");
            }
        }
    }
}
