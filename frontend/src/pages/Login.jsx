import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const res = await api.post("/auth/login", {
      email,
      password
    });

    console.log("LOGIN RESPONSE:", res.data);

    localStorage.setItem(
      "token",
      res.data.token
    );

    console.log(
      "TOKEN GUARDADO:",
      localStorage.getItem("token")
    );

   window.location.href = "/dashboard";

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.error ||
      "Error iniciando sesión"
    );

  }
};


  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        className="card"
        style={{
          width: "350px",
          textAlign: "center"
        }}
      >

        <h1>
           Barber Booking
        </h1>

        <p>
          Inicia sesión para gestionar tus citas
        </p>


        <form onSubmit={handleLogin}>


          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />


          <br />
          <br />


          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          <br />
          <br />


          <button type="submit">
            Entrar 
          </button>


        </form>


        <p style={{marginTop:"20px"}}>

          ¿No tienes cuenta?

          <br />

          <Link to="/register">
            Crear cuenta
          </Link>

        </p>


      </div>

    </div>

  );
}


export default Login;