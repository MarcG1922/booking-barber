import { Link } from "react-router-dom";

function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav
      style={{
        backgroundColor: "#111827",
        color: "white",

        padding: "20px",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        borderRadius: "12px",
        marginBottom: "30px"
      }}
    >
      <div
        style={{
          fontSize: "22px",
          fontWeight: "bold"
        }}
      >
        💈 Barber Booking
      </div>

      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center"
        }}
      >
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/services">
          Servicios
        </Link>

        <Link to="/my-bookings">
          Mis Reservas
        </Link>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;