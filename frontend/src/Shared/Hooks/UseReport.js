import {
  createReportRequest,
  listReports,
  getAllReports,
  updateReportStatus,
} from "../../Services/api";

import React, { useState } from "react";

export const UseReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [reports, setReports] = useState([[]]);

  const saveReport = async (reportData) => {
    (setLoading(true), setError(null), setSuccess(false));

    try {
      const data = await createReportRequest(reportData);
      setSuccess(true);
      return data;
    } catch (err) {
      setError(err.errors || err.message || "Ocurrió un error inesperado");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Extraer historial de reportes
  const getHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listReports();
      setReports(data.reports || []);
    } catch (err) {
      setError(err.message || "No se pudo cargar el historial");
    } finally {
      setLoading(false);
    }
  };

  // Get para administradores
  const getAllHistory = async () => {
    (setLoading(true), setError(null));
    const response = await getAllReports();

    if (response.error) {
      setError(response.message);
    } else {
      setReports(response.reports || response);
    }
    setLoading(false);
  };

  // Update status administradores
  const updateReport = async (id, nuevoEstado) => {
    setError(null);
    const response = await updateReportStatus(id, nuevoEstado);
    if (response.error) {
      setError(response.message);
    } else {
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === id ? { ...report, status: nuevoEstado } : report,
        ),
      );
    }
  };

  return {
    saveReport,
    getHistory,
    reports,
    getAllHistory,
    updateReport,
    loading,
    error,
    success,
    setSuccess,
  };
};
