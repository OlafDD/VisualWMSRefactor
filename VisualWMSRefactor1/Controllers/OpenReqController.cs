using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VisualWMSRefactor1.Models;

namespace VisualWMSRefactor1.Controllers
{
    public class OpenReqController : Controller
    {
        // GET: OpenReq
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ObtenerRequerimientos(string fechaLimiteInferior, string planta)
        {
            try
            {
                return Json(OTR_RAW.ObtenerRequerimientos(fechaLimiteInferior,planta),JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ObtenerTodo(string planta)
        {
            try
            {
                return Json(OTR_RAW.ObtenerTodoRequerimientos(planta), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ObtenerUltimaActualizacion()
        {
            try
            {
                return Json(OTR_RAW.ObtenerUltimaActualizacion(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex, JsonRequestBehavior.AllowGet);
            }
        }
    }
}