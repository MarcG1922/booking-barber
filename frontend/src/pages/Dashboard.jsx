import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {

  return (
    <div>
<div className="container">
      <Navbar />

      <h1>Dashboard 💈</h1>

      <p>Bienvenido a Barber Booking</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            minWidth: "150px"
          }}
        >
          <h3>Servicios</h3>
          <p>Gestiona tus citas</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            minWidth: "150px"
          }}
        >
          <h3>Reservas</h3>
          <p>Consulta tus citas</p>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/services">
          Ir a servicios
        </Link>

        <br />
        <br />

        <Link to="/my-bookings">
          Ver mis reservas
        </Link>
      </div>
</div>
    </div>
  );
}

export default Dashboard;