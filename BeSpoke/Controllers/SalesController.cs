using BeSpoke.Data.Repositories;
using BeSpoke.Data.Context;
using BeSpoke.Entities.Model;
using BeSpoke.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BeSpoke.Controllers
{
    public class SalesController : Controller
    {
        // GET: Sales
        public ActionResult Index()
        {
            return View();
        }
		[HttpGet]
		public JsonResult SalesList(DTParameterModel model, DateTime? startDate, DateTime? endDate)
		{
			var repo = new SalesRepository();
			var sales = repo.GetSales(startDate,endDate);

			var pdto = new DTResponse
			{
				recordsTotal = sales.Count(),
				recordsFiltered = sales.Count(),
				data = sales,
				draw = model.Draw,
				error = ""
			};

			return new JsonResult { Data = pdto, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
		}

		public ActionResult QuarterlyCommission()
        {
			var repo = new SalesRepository();
			List<int> yearsOfSales = repo.GetYearsOfSales();
			return View(yearsOfSales);
        }

		[HttpGet]
		public JsonResult QuarterlyCommissionList(DTParameterModel model, int year)
		{
			var repo = new SalesRepository();
			var commissionList = repo.GetQuarterlyCommission(year);

			var pdto = new DTResponse
			{
				recordsTotal = commissionList.Count(),
				recordsFiltered = commissionList.Count(),
				data = commissionList,
				draw = model.Draw,
				error = ""
			};

			return new JsonResult { Data = pdto, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
		}

		[HttpPost]
		public JsonResult CompleteSale(SaleViewModel model)
		{
			bool success = true;
			BeSpokeContext context = new BeSpokeContext();
			using (var dbContextTransaction = context.Database.BeginTransaction())
            {
				try
				{
					// Add Customer
					var custRepo = new CustomerRepository();
					custRepo.AddOrUpdateCustomer(model.Customer, model.SaleDate);

					//Create Sale
					Sale sale = new Sale();
					sale.CustomerId = model.Customer.CustomerId;
					sale.ProductId = model.Product.ProductId;
					sale.SalesPersonId = model.SalesPersonId;
					sale.Date = model.SaleDate;
					var salesRepo = new SalesRepository();
					salesRepo.CreateSale(sale);

					//Update Product Count
					var productRepo = new ProductRepository();
					productRepo.UpdateQtyOnHand(model.Product.ProductId);
					dbContextTransaction.Commit();

				}
				catch(Exception e)
                {
					success = false;
					dbContextTransaction.Rollback();
				}

			}
			return new JsonResult { Data = success };
		}
	}
}