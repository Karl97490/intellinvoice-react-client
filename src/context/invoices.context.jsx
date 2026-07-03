import { createContext, useState, useEffect } from "react";
import invoiceService from "../services/invoice.service";

export const InvoicesContext = createContext();

export const InvoicesProvider = ({ children }) => {
  const [dashboardStats, setDashboardStats] = useState({
    totalInvoices: 0,
    totalPaid: 0,
    totalUnpaid: 0,
    totalAmount: 0,
  });
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [error, setError] = useState(null);

  // Charger les stats au montage du composant
  useEffect(() => {
    loadInvoicesStats();
  }, []);

  const loadInvoicesStats = async () => {
    setIsLoadingStats(true);
    try {
      const statsResponse = await invoiceService.getInvoicesStats();
      setDashboardStats(statsResponse.data);
      setError(null);
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || "Error loading stats");
    } finally {
      setIsLoadingStats(false);
    }
  };

  const loadRecentInvoices = async (limit = 5) => {
    try {
      const response = await invoiceService.getAllInvoices({
        limit,
        page: 1,
      });
      setRecentInvoices(response.data);
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || "Error loading recent invoices");
    }
  };

  const value = {
    dashboardStats,
    setDashboardStats,
    recentInvoices,
    setRecentInvoices,
    isLoadingStats,
    error,
    loadInvoicesStats,
    loadRecentInvoices,
  };

  return (
    <InvoicesContext.Provider value={value}>
      {children}
    </InvoicesContext.Provider>
  );
};
