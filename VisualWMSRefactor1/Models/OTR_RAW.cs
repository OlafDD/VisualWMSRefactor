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

        public static List<OTR_RAW> ObtenerRequerimientos(string fechaLimiteInferior)
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

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            requerimientos.Add(new OTR_RAW()
                            {
                                ID = reader.GetDecimal(0),
                                DestStorBin = reader.GetString(1),
                                Material = new PART_NUMBERS
                                {
                                    MatNR = reader.GetString(2),
                                    MacTX = reader.GetString(6),
                                },
                                OP_User = reader.GetString(3),
                                TRReqQuantity = reader.GetString(4),
                                CreatedOn = reader.GetString(5),
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
    }
}