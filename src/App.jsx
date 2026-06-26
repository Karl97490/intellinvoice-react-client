import { useEffect, useState } from "react";
import "./App.css";
import { service } from "../services/index.service";

function App() {
  useEffect(
    () =>
      async function getData() {
        try {
          const response = await service.get("/");
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
