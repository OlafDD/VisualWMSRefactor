using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace VisualWMSRefactor1.Helpers
{
    public class FotoHelper
    {
        public static string FotoBase64(string material)
        {
            string base64 = "";
            try
            {
                string imagePath = $@"C:\Users\olivier.martinez\OneDrive - PLASTIC OMNIUM\Desktop\fotosTest\{material}.jpg";

                byte[] imageBytes = File.ReadAllBytes(imagePath);
                base64 = Convert.ToBase64String(imageBytes);
                
            }catch (Exception ex)
            {
                base64 = ex.Message;
            }
            return base64;
        }
    }
}