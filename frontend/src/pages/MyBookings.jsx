import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const fetchBookings = async () => {
      try {

        const res = await api.get("/bookings/me");

        setBookings(res.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();

  }, []);

  const cancelBooking = async (id) => {
    try {

      await api.patch(`/bookings/${id}/cancel`);

      setBookings(
        bookings.map((booking) =>
          booking.id === id
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  const getStatusEmoji = (status) => {

    if (status === "cancelled") return "🔴";
    if (status === "pending") return "🟡";

    return "🟢";
  };

  return (
    <div className="container">

      <Navbar />

      <h1>Mis reservas 💈</h1>

      {bookings.length === 0 && (
        <div className="card">
          <p>No tienes reservas todavía.</p>
        </div>
      )}

      {bookings.map((b) => (
        <div
          className="card"
          key={b.id}
        >
          <h3>💈 {b.service_name}</h3>

          <p>
            📅 {new Date(b.booking_date).toLocaleString()}
          </p>

          <p>
            {getStatusEmoji(b.status)} Estado: {b.status}
          </p>

          <p>
            💰 {b.price}€
          </p>

          <p>
            ⏱ {b.duration} min
          </p>

          {b.status !== "cancelled" && (
            <button
              onClick={() => cancelBooking(b.id)}
            >
              Cancelar reserva
            </button>
          )}

        </div>
      ))}

    </div>
  );
}

export default MyBookings;