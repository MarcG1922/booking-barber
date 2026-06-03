import { useEffect, useState } from "react";
import api from "../services/api";

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

  return (
    <div>
      <h1>Mis reservas 💈</h1>

      {bookings.length === 0 && (
        <p>No tienes reservas todavía</p>
      )}

      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h3>{b.service_name}</h3>

          <p>
            📅 {new Date(b.booking_date).toLocaleString()}
          </p>

          <p>
            ⏳ {b.status}
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