import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import MyBookings from "./pages/MyBookings";

function App() {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/services"
          element={token ? <Services /> : <Navigate to="/" />}
        />

      <Route
  path="/my-bookings"
  element={token ? <MyBookings /> : <Navigate to="/" />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;