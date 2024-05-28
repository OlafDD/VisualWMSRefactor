using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using VisualWMSRefactor1.Helpers;

namespace VisualWMSRefactor1.Models
{
    public class MINMAX_RAW : DBHelper
    {
        public decimal Max_ID { get; set; }
        public string Max_Material { get; set; }
        public string Max_Warehouse { get; set; }
        public string Max_Storage_Bin { get; set; }
        public int Max_Maximum_Bin_Qty { get; set; }
        public int Max_Minimum_Bin_Qty { get; set; }
        public int Total_Stock { get; set; }
        public static List<MINMAX_RAW> obtenerTodo(string planta)
        {
            List<MINMAX_RAW> mINMAX_RAWs = new List<MINMAX_RAW>();
            SqlConnection conn = DBHelper.Conexion();

            if (conn.State == ConnectionState.Closed)
                conn.Open();

            try
            {
                using (SqlCommand command = new SqlCommand("sp_MIN_MAX_RAW_ObtenerTodo", conn))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Planta", planta);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            mINMAX_RAWs.Add(new MINMAX_RAW
                            {
                                Max_ID = reader.IsDBNull(0) ? decimal.Zero : reader.GetDecimal(0),
                                Max_Material = reader.IsDBNull(1) ? string.Empty : reader.GetString(1),
                                Max_Warehouse = reader.IsDBNull(2) ? string.Empty : reader.GetString(2),
                                Max_Storage_Bin = reader.IsDBNull(3) ? string.Empty : reader.GetString(3),
                                Max_Maximum_Bin_Qty = reader.IsDBNull(4) ? 0 : reader.GetInt32(4),
                                Max_Minimum_Bin_Qty = reader.IsDBNull(5) ? 0 : reader.GetInt32(5),
                                Total_Stock = reader.IsDBNull(6) ? 0 : reader.GetInt32(6)
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                conn.Close();
            }
            return mINMAX_RAWs;
        }
        public static List<MINMAX_RAW> ObtenerMINMAXFiltro(string planta, string material, string bin)
        {
            List<MINMAX_RAW> mINMAX_RAWs = new List<MINMAX_RAW>();
            SqlConnection conn = DBHelper.Conexion();

            if (conn.State == ConnectionState.Closed)
                conn.Open();

            try
            {
                using (SqlCommand command = new SqlCommand("sp_MIN_MAX_RAW_ObtenerFiltro", conn))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Planta", planta);
                    command.Parameters.AddWithValue("@Material", material);
                    command.Parameters.AddWithValue("@Bin", bin);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            mINMAX_RAWs.Add(new MINMAX_RAW
                            {
                                Max_ID = reader.IsDBNull(0) ? decimal.Zero : reader.GetDecimal(0),
                                Max_Material = reader.IsDBNull(1) ? string.Empty : reader.GetString(1),
                                Max_Warehouse = reader.IsDBNull(2) ? string.Empty : reader.GetString(2),
                                Max_Storage_Bin = reader.IsDBNull(3) ? string.Empty : reader.GetString(3),
                                Max_Maximum_Bin_Qty = reader.IsDBNull(4) ? 0 : reader.GetInt32(4),
                                Max_Minimum_Bin_Qty = reader.IsDBNull(5) ? 0 : reader.GetInt32(5),
                                Total_Stock = reader.IsDBNull(6) ? 0 : reader.GetInt32(6)
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                conn.Close();
            }
            return mINMAX_RAWs;
        }
    }
}