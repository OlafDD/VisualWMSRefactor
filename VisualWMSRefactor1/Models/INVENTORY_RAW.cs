using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using VisualWMSRefactor1.Helpers;
using System.Runtime.Remoting.Messaging;

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
        public string GrNumber { get; set; }
        public int TotalStock { get; set; }
        public string BaseUnit { get; set; }
        public string AvailableStock { get; set; }
        public string BaseUnit1 { get; set; }
        public int StockPut { get; set; }
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
                    command.CommandTimeout = 240;

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
                                StockPut = reader.IsDBNull(4) ? int.MinValue : reader.GetInt32(4),
                                StorageLocation = reader.IsDBNull(5) ? string.Empty : reader.GetString(5),
                                MaterialDesc = reader.IsDBNull(6) ? string.Empty : reader.GetString(6),
                                StockSuma = reader.IsDBNull(7) ? int.MinValue : reader.GetInt32(7),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                inventario.Add(new INVENTORY_RAW()
                {
                    Material = ex.Message,
                });
            }
            finally
            {
                conn.Close();
            }
            return inventario;
        }
        public static List<INVENTORY_RAW> ObtenerPartesIguales(string planta, string material, string parte)
        {
            List<INVENTORY_RAW> partes = new List<INVENTORY_RAW>();
            SqlConnection conn = DBHelper.Conexion();
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            try
            {
                using (SqlCommand command = new SqlCommand("sp_INVENTORY_RAW_ObtenerPartesIguales", conn))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Planta", planta);
                    command.Parameters.AddWithValue("@SBin", parte);
                    command.Parameters.AddWithValue("@Material", material);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            partes.Add(new INVENTORY_RAW()
                            {
                                ID = reader.IsDBNull(0) ? decimal.Zero : reader.GetDecimal(0),
                                Material = reader.IsDBNull(1) ? string.Empty : reader.GetString(1),
                                StorageType = reader.IsDBNull(2) ? string.Empty : reader.GetString(2),
                                StorageBin = reader.IsDBNull(3) ? string.Empty : reader.GetString(3),
                                TotalStock = reader.IsDBNull(4) ? int.MinValue : reader.GetInt32(4),
                                StorageLocation = reader.IsDBNull(5) ? string.Empty : reader.GetString(5),
                                GrNumber = reader.IsDBNull(6) ? string.Empty : reader.GetString(6),
                                MaterialDesc = reader.IsDBNull(7) ? string.Empty : reader.GetString(7),
                                StockSuma = reader.IsDBNull(8) ? int.MinValue : reader.GetInt32(8),
                                StorageUnit = reader.IsDBNull(9) ? string.Empty : reader.GetString(9)
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                partes.Add(new INVENTORY_RAW()
                {
                    Material = ex.Message,
                });
            }
            finally
            {
                conn.Close();
            }
            return partes;
        }
    }
}