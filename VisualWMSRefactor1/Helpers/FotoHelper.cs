using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml;

namespace VisualWMSRefactor1.Helpers
{
    public class FotoHelper
    {
        public static string FotoBase64(string material)
        {
            string base64 = "";
            try
            {
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.Load(HttpRuntime.AppDomainAppPath + "/Config/ImageConfig.xml");
                XmlNodeList urlXML = xmlDoc.GetElementsByTagName("url");

                string imagePath = urlXML[0].InnerText;

                imagePath = $@"{imagePath}{material}.jpg";
                string cabecera = "data:image/jpeg;base64,";

                byte[] imageBytes = File.ReadAllBytes(imagePath);
                base64 =  cabecera + Convert.ToBase64String(imageBytes);
                
            }catch (Exception ex)
            {
                base64 = ex.Message;
            }
            return base64;
        }
    }
}