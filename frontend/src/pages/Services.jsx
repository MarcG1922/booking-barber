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
      alert(error.response?.data?.error || "Error creando reserva");
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Servicios 💈</h1>

      {/* LISTA SERVICIOS */}
      {services.map((service) => (
        <div
  className="card"
  key={service.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h3>{service.name}</h3>

          <p>Duración: {service.duration} min</p>
          <p>Precio: {service.price}€</p>
        </div>
      ))}

      <hr />

      { /* RESERVAR CITA */ }
      <h2>Reservar cita</h2>

      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      >
        <option value="">
          Selecciona un servicio
        </option>

        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>

      <br /><br />

      <input
        type="datetime-local"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
      />

      <br /><br />

      <button onClick={handleBooking}>
        Reservar 💈
      </button>
    </div>
  );
}

export default Services;