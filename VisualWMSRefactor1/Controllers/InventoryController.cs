using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VisualWMSRefactor1.Models;

namespace VisualWMSRefactor1.Controllers
{
    public class InventoryController : Controller
    {
        // GET: Inventory
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ObtenerInventario(string planta)
        {
            try
            {
                return Json(INVENTORY_RAW.ObtenerInventario(planta), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        public JsonResult ObtenerPartesIguales(string planta, string material, string parte)
        {
            try
            {
                return Json(INVENTORY_RAW.ObtenerPartesIguales(planta,material,parte), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
    }
}