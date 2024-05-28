using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using VisualWMSRefactor1.Models;

namespace VisualWMSRefactor1.Controllers
{
    public class ReceivingController : Controller
    {
        // GET: Receiving
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ObtenerMinMax(string planta)
        {
            try
            {
                return Json(MINMAX_RAW.obtenerTodo(planta), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }

        }
        public JsonResult ObtenerMinMaxFiltro(string planta, string material, string bin)
        {
            try
            {
                return Json(MINMAX_RAW.ObtenerMINMAXFiltro(planta, material, bin), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }

        }
    }
}