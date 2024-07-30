import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

export const appURL = "http://localhost:5000";

export const MyContext = createContext({ isAuth: false });

const AuthContext = () => {
  const initialUser = localStorage.getItem("User");
  const [user, setUser] = useState(
    initialUser ? JSON.parse(initialUser) : undefined
  );
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <MyContext.Provider
      value={{ user, setUser, isAuth, setIsAuth, loading, setLoading }}
    >
      <App />
    </MyContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext />
    </BrowserRouter>
  </React.StrictMode>
);
