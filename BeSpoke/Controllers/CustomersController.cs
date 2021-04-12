using BeSpoke.Data.Repositories;
using BeSpoke.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BeSpoke.Controllers
{
    public class CustomersController : Controller
    {
        // GET: Customers
        public ActionResult Index()
        {
            return View();
        }

		[HttpGet]
		public JsonResult CustomerList(DTParameterModel model)
		{
			var repo = new CustomerRepository();
			var customers = repo.GetCustomers();

			var pdto = new DTResponse
			{
				recordsTotal = customers.Count(),
				recordsFiltered = customers.Count(),
				data = customers,
				draw = model.Draw,
				error = ""
			};

			return new JsonResult { Data = pdto, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
		}
	}
}