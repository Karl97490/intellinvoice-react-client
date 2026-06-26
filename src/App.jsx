import { useEffect, useState } from "react";
import "./App.css";
import authService from "../services/auth.service";

function App() {
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
      const authToken = response.data.authToken;
      localStorage.setItem("authToken", authToken);
    } catch (error) {
      console.log(error);
    }
  };

  const authVerify = async () => {
    try {
      const response = await authService.verify();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      This is App component...
      <button onClick={authSignUp}>SignUp</button>
      <button onClick={authLogin}>Login</button>
      <button onClick={authVerify}>Verify</button>
    </>
  );
}

export default App;
