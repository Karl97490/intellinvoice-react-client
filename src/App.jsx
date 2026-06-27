import { useContext, useEffect, useState } from "react";
import "./App.css";

import { initFlowbite } from "flowbite";

import { AuthContext } from "./context/auth.context";
import authService from "./services/auth.service";

import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dasboard";
import OnlyPublic from "./pages/OnlyPublic";
import OnlyPrivate from "./pages/OnlyPrivate";

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
