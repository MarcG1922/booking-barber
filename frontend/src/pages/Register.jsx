import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Usuario creado");

      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Error register");
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
  type="password"
  placeholder="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;