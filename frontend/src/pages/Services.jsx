import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Services() {

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  useEffect(() => {

    const fetchServices = async () => {
      try {

        const res = await api.get("/services");

        setServices(res.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();

  }, []);

  const handleBooking = async () => {
    try {

      const res = await api.post("/bookings", {
        service_id: Number(selectedService),
        booking_date: bookingDate
      });

      alert("Reserva creada 💈");

      console.log(res.data);

      setSelectedService("");
      setBookingDate("");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.error ||
        "Error creando reserva"
      );
    }
  };

  return (
    <div className="container">

      <Navbar />

      <h1>Servicios 💈</h1>

      <p>
        Elige uno de nuestros servicios y reserva tu cita.
      </p>

      {services.map((service) => (
        <div
          className="card"
          key={service.id}
        >
          <h3>💈 {service.name}</h3>

          <p>
            ⏱ {service.duration} min
          </p>

          <p>
            💰 {service.price}€
          </p>
        </div>
      ))}

      <div className="card">

        <h2>📅 Reservar cita</h2>

        <select
          value={selectedService}
          onChange={(e) =>
            setSelectedService(e.target.value)
          }
        >
          <option value="">
            Selecciona un servicio
          </option>

          {services.map((service) => (
            <option
              key={service.id}
              value={service.id}
            >
              {service.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <input
          type="datetime-local"
          value={bookingDate}
          onChange={(e) =>
            setBookingDate(e.target.value)
          }
        />

        <br />
        <br />

        <button onClick={handleBooking}>
          Reservar 💈
        </button>

      </div>

    </div>
  );
}

export default Services;