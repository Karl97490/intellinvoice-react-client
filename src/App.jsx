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

  return <>This is App component...</>;
}

export default App;
