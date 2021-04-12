using BeSpoke.Data.Context;
using BeSpoke.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace BeSpoke.Data.Repositories
{
    public class SalesRepository
    {
        BeSpokeContext context = new BeSpokeContext();

        public List<SalesListDTO> GetSales(DateTime? startDate, DateTime? endDate)
        {
            DateTime? endDatePlusOne = null;
            if (endDate.HasValue)
            {
                endDatePlusOne = endDate.Value.AddDays(1);
            }
            return (from s in context.Sales
                    join p in context.Products
                        on s.ProductId equals p.ProductId
                    join c in context.Customers
                        on s.CustomerId equals c.CustomerId
                    join sp in context.SalesPersons
                        on s.SalesPersonId equals sp.SalesPersonId
                    join d in context.Discounts
                     on p.ProductId equals d.ProductId into dgj
                    from dgjj in dgj.DefaultIfEmpty()
                    where (startDate == null || s.Date >= startDate) && (endDatePlusOne == null || s.Date < endDatePlusOne)
                    select new SalesListDTO
                        {
                            Sale = s,
                            Product = p,
                            Customer = c,
                            SalesPerson = sp,
                            Discount = dgjj
                    }).ToList();
            
        }

        public List<QuarterlyCommissionDTO> GetQuarterlyCommission(int year)
        {
            var data = context.Database.SqlQuery<QuarterlyCommissionDTO>("dbo.QuarterlyCommission @Year",
                new SqlParameter("Year", year)
                ).ToList();
            return data;
        }

        public List<int> GetYearsOfSales()
        {
            return context.Sales.Select(x => x.Date.Year).Distinct().OrderByDescending(x => x).ToList();
        }

        public void CreateSale(Sale sale)
        {
            try
            {
                context.Sales.Add(sale);
                context.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
