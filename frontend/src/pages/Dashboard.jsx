import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {

  const [stats, setStats] = useState({
    activeBookings: 0,
    totalServices: 0,
    nextBooking: null
  });

  useEffect(() => {

    const fetchStats = async () => {
      try {

        const res = await api.get(
          "/bookings/stats/dashboard"
        );

        setStats(res.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();

  }, []);

  return (
    <div className="container">

      <Navbar />

      <h1>Dashboard 💈</h1>

      <p>Bienvenido a Barber Booking</p>

  <div
  style={{
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "30px"
  }}
>
 <div className="card">
  <h3>📅 Reservas activas</h3>
  <p>{stats.activeBookings}</p>
</div>

<div className="card">
  <h3>💈 Servicios disponibles</h3>
  <p>{stats.totalServices}</p>
</div>

<div className="card">
  <h3>⏰ Próxima cita</h3>

  <p>
    {stats.nextBooking
      ? new Date(stats.nextBooking).toLocaleString()
      : "Sin reservas"}
  </p>
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
  );
}

export default Dashboard;