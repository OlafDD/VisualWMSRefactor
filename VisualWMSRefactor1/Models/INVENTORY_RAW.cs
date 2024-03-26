using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using VisualWMSRefactor1.Helpers;

namespace VisualWMSRefactor1.Models
{
    public class INVENTORY_RAW : DBHelper
    {
        public decimal ID { get; set; }
        public string WareHouse { get; set; }
        public string Plant { get; set; }
        public string Quant { get; set; }
        public string Material { get; set; }
        public string MaterialDesc { get; set; }
        public string StorageType { get; set; }
        public string StorageBin { get; set; }
        //public string GrDate { get; set; }
        //public string GrNumber { get; set; }
        public string TotalStock { get; set; }
        public string BaseUnit { get; set; }
        public string AvailableStock { get; set; }
        public string BaseUnit1 { get; set; }
        public string StockPut { get; set; }
        public int StockSuma { get; set; }
        //public string BaseUnit2 { get; set; }
        //public string PickQuantity { get; set; }
        //public string BaseUnit3 { get; set; }
        public string StorageUnit { get; set; }
        public string StorageLocation { get; set; }
        //public string HUQuant { get; set; }
        //public string Delivery { get; set; }
        //public string Spare { get; set; }
        //public string DateCreated { get; set; }
        public static List<INVENTORY_RAW> ObtenerInventario(string planta)
        {
            List<INVENTORY_RAW> inventario = new List<INVENTORY_RAW>();
            SqlConnection conn = DBHelper.Conexion();
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            try
            {
                using (SqlCommand command = new SqlCommand("sp_INVENTORY_RAW_ObtenerTodo", conn))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Planta", planta);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            inventario.Add(new INVENTORY_RAW()
                            {
                                ID = reader.IsDBNull(0) ? decimal.Zero : reader.GetDecimal(0),
                                Material = reader.IsDBNull(1) ? string.Empty : reader.GetString(1),
                                StorageType = reader.IsDBNull(2) ? string.Empty : reader.GetString(2),
                                StorageBin = reader.IsDBNull(3) ? string.Empty : reader.GetString(3),   
                                TotalStock = reader.IsDBNull(4) ? string.Empty : reader.GetString(4),
                                StorageLocation = reader.IsDBNull(5) ? string.Empty : reader.GetString(5),
                                MaterialDesc = reader.IsDBNull(6) ? string.Empty : reader.GetString(6),
                                StockSuma = reader.IsDBNull(7) ? int.MinValue : reader.GetInt32(7),
                            });
                        }
                    }
                }
            }
            catch
            {

            }
            finally
            {
                conn.Close();
            }
            return inventario;
        }
    }
}