using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VisualWMSRefactor1.Helpers;
using VisualWMSRefactor1.Models;

namespace VisualWMSRefactor1.Controllers 
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ObtenerPlantasDistintas()
        {
            try
            {
                return Json(OTR_RAW.ObtenerPlantasDistintas(),JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex,JsonRequestBehavior.AllowGet);
            }
        }
    }
}