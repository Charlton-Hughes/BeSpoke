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
    public class SalesPersonController : Controller
    {
        // GET: SalesPerson
        public ActionResult Index()
        {
            return View();
        }

		[HttpGet]
		public JsonResult SalesPersonList()
		{
			var repo = new SalesPersonRepository();
			var salesPersonList = repo.GetSalesPersons();

			var pdto = new DTResponse
			{
				recordsTotal = salesPersonList.Count(),
				recordsFiltered = salesPersonList.Count(),
				data = salesPersonList,
				draw = 0,
				error = ""
			};

			return new JsonResult { Data = pdto, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
		}

		[HttpPost]
		public JsonResult AddOrUpdateSalesPerson(SalesPerson salesPerson)
		{
			var repo = new SalesPersonRepository();
			bool success = repo.AddOrUpdateSalesPerson(salesPerson);
			return new JsonResult { Data = success };
		}
	}
}