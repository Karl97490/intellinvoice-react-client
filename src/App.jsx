import { useContext, useEffect, useState } from "react";
import "./App.css";

import authService from "./services/auth.service";
import { AuthContext } from "./context/auth.context";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function App() {
  const { isLoggedIn, userId, authenticateUser, storeToken, removeToken } =
    useContext(AuthContext);

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

  const authSignUp = async () => {
    try {
      const body = {
        firstName: "TestFrontEnd",
        lastName: "Test Front-End",
        email: "test.frontend@mail.com",
        password: "TestFrontEnd000",
      };
      const response = await authService.signUp(body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const authLogin = async () => {
    try {
      const body = {
        email: "test.frontend@mail.com",
        password: "TestFrontEnd000",
      };
      const response = await authService.login(body);
      console.log(response);
      storeToken(response.data.authToken);
      await authenticateUser();
    } catch (error) {
      console.log(error);
    }
  };

  const authLogOut = async () => {
    // delete items
    removeToken();

    console.log("logout success.");

    // Update states
    authenticateUser();

    // navigate
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      {/* This is App component...
      {!isLoggedIn && (
        <>
          <button onClick={authSignUp}>SignUp</button>
          <button onClick={authLogin}>Login</button>
        </>
      )}
      {isLoggedIn && (
        <>
          <div>
            <p>{userId}</p>
          </div>
          <button onClick={authLogOut}>LogOut</button>
        </>
      )} */}
    </>
  );
}

export default App;
