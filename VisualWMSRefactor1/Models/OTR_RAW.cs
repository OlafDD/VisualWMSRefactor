using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using VisualWMSRefactor1.Helpers;

namespace VisualWMSRefactor1.Models
{
    public class OTR_RAW : DBHelper
    {
        public decimal ID { get; set; }
        public string Plant { get; set; }
        public string Warehouse { get; set; }
        public string DestStoryType { get; set; }
        public string DestStorBin { get; set; }
        public PART_NUMBERS Material { get; set; }
        public string TRNumber { get; set; }
        public string HeaderStatus { get; set; }
        public string CreatedOn { get; set; }
        public string CreationTime { get; set; }
        public string OP_User { get; set; }
        public string TRReqQuantity { get; set; }
        public string BaseUnit { get; set; }
        public string TONumber { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string StorUnitTime { get; set; }
        public string StorLoc { get; set; }
        public string Spare { get; set; }
        public string Status { get; set; }
        public string DateCreated { get; set; }

        public static List<OTR_RAW> ObtenerRequerimientos(string fechaLimiteInferior, string planta)
        {
            List<OTR_RAW> requerimientos = new List<OTR_RAW>();
            SqlConnection conn = DBHelper.Conexion();
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            try
            {
                using (SqlCommand command = new SqlCommand("sp_OTR_RAW_ObtenerLimiteInferior", conn))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@FechaInferior", fechaLimiteInferior);
                    command.Parameters.AddWithValue("@planta", planta);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            requerimientos.Add(new OTR_RAW()
                            {
                                ID = reader.IsDBNull(0) ? decimal.Zero : reader.GetDecimal(0),
                                DestStorBin = reader.IsDBNull(1) ? string.Empty : reader.GetString(1),
                                Material = new PART_NUMBERS
                                {
                                    MatNR = reader.IsDBNull(2) ? string.Empty : reader.GetString(2),
                                    MacTX = reader.IsDBNull(6) ? string.Empty : reader.GetString(6),
                                },
                                OP_User = reader.IsDBNull(3) ? string.Empty : reader.GetString(3),
                                TRReqQuantity = reader.IsDBNull(4) ? string.Empty : reader.GetString(4),
                                CreatedOn = reader.IsDBNull(5) ? string.Empty : reader.GetString(5),
                                DestStoryType = reader.IsDBNull(7) ? string.Empty : reader.GetString(7),
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
            return requerimientos;
        }
        public static List<OTR_RAW> ObtenerTodoRequerimientos(string planta)
        {
            List<OTR_RAW> requerimientos = new List<OTR_RAW>();
            SqlConnection conn = DBHelper.Conexion();
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            try
            {
                using (SqlCommand command = new SqlCommand("sp_OTR_RAW_ObtenerTodo", conn))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Planta", planta);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            requerimientos.Add(new OTR_RAW()
                            {
                                ID = reader.IsDBNull(0) ? decimal.Zero : reader.GetDecimal(0),
                                DestStorBin = reader.IsDBNull(1) ? string.Empty : reader.GetString(1),
                                Material = new PART_NUMBERS
                                {
                                    MatNR = reader.IsDBNull(2) ? string.Empty : reader.GetString(2),
                                    MacTX = reader.IsDBNull(6) ? string.Empty : reader.GetString(6),
                                },
                                OP_User = reader.IsDBNull(3) ? string.Empty : reader.GetString(3),
                                TRReqQuantity = reader.IsDBNull(4) ? string.Empty : reader.GetString(4),
                                CreatedOn = reader.IsDBNull(5) ? string.Empty : reader.GetString(5),
                                DestStoryType = reader.IsDBNull(7) ? string.Empty : reader.GetString(7),
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
            return requerimientos;
        }
        public static List<string> ObtenerPlantasDistintas()
        {
            List<string> plantas = new List<string>();
            SqlConnection conn = DBHelper.Conexion();
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            try
            {
                using (SqlCommand command = new SqlCommand("sp_OTR_RAW_ObtenerPlantaDistinta", conn))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            plantas.Add(reader.GetString(0));
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
            return plantas;
        }
        public static string ObtenerUltimaActualizacion()
        {
            string ultimaFecha = "";
            SqlConnection conn = DBHelper.Conexion();
            if (conn.State == ConnectionState.Closed)
                conn.Open();
            try
            {
                using (SqlCommand command = new SqlCommand("sp_OPEN_REQ_Obtener_Ultima_Actualizacion", conn))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            ultimaFecha = reader.IsDBNull(0) ? string.Empty : reader.GetString(0);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ultimaFecha = ex.Message;
            }
            finally
            {
                conn.Close();
            }
            return ultimaFecha;
        }
    }
}