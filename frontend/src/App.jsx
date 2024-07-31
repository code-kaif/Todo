import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import { MyContext } from "./main";
import { useContext } from "react";

function App() {
  const { user } = useContext(MyContext);
  console.log(user);
  return (
    <>
      <div className=" max-w-screen-2xl h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to={"/login"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
