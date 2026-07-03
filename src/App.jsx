import { useContext, useEffect, useState } from "react";
import "./App.css";

import { initFlowbite } from "flowbite";

import { Routes, Route } from "react-router-dom";
import { InvoicesProvider } from "./context/invoices.context";
import Layout from "./pages/Layout";
import HomePage from "./pages/landing/HomePage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dasboard/Dasboard";
import Invoices from "./pages/invoices/Invoices";
import InvoiceDetails from "./pages/invoices/InvoiceDetails";
import CreateInvoice from "./pages/invoices/CreateInvoice";
import EditInvoice from "./pages/invoices/EditInvoice";
import Clients from "./pages/clients/Clients";
import CreateClient from "./pages/clients/CreateClient";
import User from "./pages/user/User";

import OnlyPrivate from "./pages/auth/OnlyPrivate";
import OnlyPublic from "./pages/auth/OnlyPublic";

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      <InvoicesProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <OnlyPublic>
                  <HomePage />
                </OnlyPublic>
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <OnlyPublic>
                  <Signup />
                </OnlyPublic>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <OnlyPublic>
                  <Login />
                </OnlyPublic>
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                <OnlyPrivate>
                  <Dashboard />
                </OnlyPrivate>
              }
            ></Route>
            <Route
              path="/invoices"
              element={
                <OnlyPrivate>
                  <Invoices />
                </OnlyPrivate>
              }
            ></Route>
            <Route
              path="/invoices/details/:invoiceId"
              element={
                <OnlyPrivate>
                  <InvoiceDetails />
                </OnlyPrivate>
              }
            ></Route>
            <Route
              path="/invoices/new"
              element={
                <OnlyPrivate>
                  <CreateInvoice />
                </OnlyPrivate>
              }
            ></Route>
            <Route
              path="/invoices/edit/:invoiceId"
              element={
                <OnlyPrivate>
                  <EditInvoice />
                </OnlyPrivate>
              }
            ></Route>
            <Route
              path="/clients"
              element={
                <OnlyPrivate>
                  <Clients />
                </OnlyPrivate>
              }
            ></Route>
            <Route
              path="/clients/new"
              element={
                <OnlyPrivate>
                  <CreateClient />
                </OnlyPrivate>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <OnlyPrivate>
                  <User />
                </OnlyPrivate>
              }
            ></Route>
          </Route>
        </Routes>
      </InvoicesProvider>
    </>
  );
}

export default App;
