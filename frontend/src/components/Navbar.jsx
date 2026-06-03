import { Link } from "react-router-dom";

function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

return (
  <nav
    style={{
      backgroundColor: "white",
      padding: "15px",
      marginBottom: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

      display: "flex",
      gap: "20px",
      alignItems: "center"
    }}
  >
      <Link to="/dashboard">Dashboard</Link>

      <Link to="/services">Servicios</Link>

      <Link to="/my-bookings">Mis reservas</Link>

      <button onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;