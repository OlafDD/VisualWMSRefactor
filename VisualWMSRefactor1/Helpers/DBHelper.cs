using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Xml;

namespace VisualWMSRefactor1.Helpers
{
    public class DBHelper
    {
        static protected string Server;
        static protected string Database;
        static protected string User;
        static protected string Port;
        static protected string Password;
        static protected SqlConnection Conexion()
        {
            try
            {
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.Load(HttpRuntime.AppDomainAppPath + "/Config/DBConfig.xml");
                XmlNodeList dbInfoServer = xmlDoc.GetElementsByTagName("server");
                Server = dbInfoServer[0].InnerText;
                XmlNodeList dbInfoDB = xmlDoc.GetElementsByTagName("db");
                Database = dbInfoDB[0].InnerText;
                XmlNodeList dbInfoUser = xmlDoc.GetElementsByTagName("user");
                User = dbInfoUser[0].InnerText;
                XmlNodeList dbInfoPassword = xmlDoc.GetElementsByTagName("password");
                Password = dbInfoPassword[0].InnerText;
            }
            catch
            {

            }
            string connectionString = $"Server={Server};Database={Database}; User ID={User}; Password={Password}";
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            return connection;
        }
        static protected void ExecuteNonQuery(string query)
        {
            using (SqlConnection connection = Conexion())
            {
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.ExecuteNonQuery();
                }
            }
        }

        static protected string ParametroStringNull(string parametro)
        {
            if (parametro == null)
            {
                parametro = "";
            }
            return parametro;
        }
        //static protected int ParametroIntNull(string parametro)
        //{
        //    int enteroCero;
        //    if (parametro == null)
        //    {
        //        enteroCero = 0;
        //    }
        //    return enteroCero;
        //}
    }
}