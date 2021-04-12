using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeSpoke.Entities.Model
{
    [Table("dbo.SalesPerson")]
    public class SalesPerson
    {
        [Key]
        public int SalesPersonId { get; set; } //(int, not null)
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
        [Required]
        public DateTime StartDate { get; set; } //(date, not null)
        public DateTime? TerminationDate { get; set; } //(date, null)
        public string Manager { get; set; } //(nvarchar(50), null)

        [NotMapped]
        public string StartDateString {
            get {
                return this.StartDate.ToShortDateString();
            }
        }

        [NotMapped]
        public string TerminationDateString
        {
            get
            {
                if (this.TerminationDate.HasValue)
                {
                    return this.TerminationDate.Value.ToShortDateString();
                }
                else
                {
                    return null;
                }
                
            }
        }

        [NotMapped]
        public string SalesPersonName
        {
            get
            {
                return string.Format($"{this.LastName}, {this.FirstName}");
            }
        }
    }

}
