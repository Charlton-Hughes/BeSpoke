using BeSpoke.Data.Repositories;
using BeSpoke.Entities.Model;
using BeSpoke.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BeSpoke.Controllers
{
    public class ProductsController : Controller
    {
        // GET: Products
        public ActionResult Index()
        {
			ProductViewModel model = new ProductViewModel();
			var custRepo = new CustomerRepository();
			model.Customers = custRepo.GetCustomers();
			var salesPersonRepo = new SalesPersonRepository();
			model.SalesPersons = salesPersonRepo.GetSalesPersons();

			return View(model);
        }

		[HttpGet]
		public JsonResult ProductList(DTParameterModel model)
		{
			var repo = new ProductRepository();
			var products = repo.GetProducts();

			var pdto = new DTResponse
			{
				recordsTotal = products.Count(),
				recordsFiltered = products.Count(),
				data = products,
				draw = model.Draw,
				error = ""
			};

			return new JsonResult { Data = pdto, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
		}

		[HttpPost]
		public JsonResult AddOrUpdateProduct(Product product)
        {
			var repo = new ProductRepository();
			bool success = repo.AddOrUpdateProduct(product);
			return new JsonResult { Data = success};
		}
	}
}