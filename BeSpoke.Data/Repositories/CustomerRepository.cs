using BeSpoke.Data.Context;
using BeSpoke.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeSpoke.Data.Repositories
{
    public class CustomerRepository
    {
        BeSpokeContext context = new BeSpokeContext();

        public List<Customer> GetCustomers()
        {
            return context.Customers.ToList();
        }

        public bool AddOrUpdateCustomer(Customer customer, DateTime? saleDate)
        {
            bool success = true;
            try
            {
                if (customer.CustomerId > 0)
                {
                    Customer existing = context.Customers.Where(x => x.CustomerId == customer.CustomerId).FirstOrDefault();
                    existing.City = customer.City;
                    existing.FirstName = customer.FirstName;
                    existing.LastName = customer.LastName;
                    existing.StartDate = saleDate != null && saleDate < existing.StartDate ? (DateTime)saleDate : existing.StartDate;
                    existing.State = customer.State;
                    existing.StreetAddress = customer.StreetAddress;
                    existing.ZipCode = customer.ZipCode;
                }
                else
                {
                    customer.StartDate = saleDate == null ? DateTime.Now : (DateTime)saleDate;
                    context.Customers.Add(customer);
                }
                context.SaveChanges();
            }
            catch (Exception e)
            {
                success = false;
            }
            return success;
        }
    }
}
