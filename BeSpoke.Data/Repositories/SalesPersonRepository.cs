using BeSpoke.Data.Context;
using BeSpoke.Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BeSpoke.Data.Repositories
{
    public class SalesPersonRepository
    {
        BeSpokeContext context = new BeSpokeContext();

        public List<SalesPerson> GetSalesPersons()
        {
            return context.SalesPersons.ToList();
        }

        public bool AddOrUpdateSalesPerson(SalesPerson salesPerson)
        {
            bool success = true;
            try
            {
                if (salesPerson.SalesPersonId > 0)
                {
                    SalesPerson existing = context.SalesPersons.Where(x => x.SalesPersonId == salesPerson.SalesPersonId).FirstOrDefault();
                    existing.City = salesPerson.City;
                    existing.FirstName = salesPerson.FirstName;
                    existing.LastName = salesPerson.LastName;
                    existing.StartDate = salesPerson.StartDate;
                    existing.TerminationDate = salesPerson.TerminationDate;
                    existing.Manager = salesPerson.Manager;
                    existing.State = salesPerson.State;
                    existing.StreetAddress = salesPerson.StreetAddress;
                    existing.ZipCode = salesPerson.ZipCode;
                }
                else
                {
                    context.SalesPersons.Add(salesPerson);
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
