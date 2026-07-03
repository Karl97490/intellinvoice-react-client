import { useContext, useEffect, useState } from "react";
import "./App.css";

import { initFlowbite } from "flowbite";
import Test from "./components/Test";

import { AuthContext } from "./context/auth.context";
import { InvoicesProvider } from "./context/invoices.context";
import authService from "./services/auth.service";

import { Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/landing/HomePage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dasboard/Dasboard";
import Invoices from "./pages/invoices/Invoices";
import InvoiceDetails from "./pages/invoices/InvoiceDetails";
import CreateInvoice from "./pages/invoices/CreateInvoice";
import Clients from "./pages/clients/Clients";
import CreateClient from "./pages/clients/CreateClient";
import User from "./pages/user/User";

import OnlyPrivate from "./pages/auth/OnlyPrivate";
import OnlyPublic from "./pages/auth/OnlyPublic";
import EditInvoice from "./pages/invoices/EditInvoice";

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);

  useEffect(
    () =>
      async function getData() {
        try {
          const response = await authService.test();
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      },
    [],
  );

  return (
    <>
      <InvoicesProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/test" element={<Test />}></Route>
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
