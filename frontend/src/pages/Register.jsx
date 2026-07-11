import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";


function Register() {

  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleRegister = async (e) => {

    e.preventDefault();


    try {

      await api.post("/auth/register", {
        name,
        email,
        password
      });


      alert(
        "Cuenta creada correctamente"
      );


      navigate("/");


    } catch(error) {

      alert(
        error.response?.data?.error ||
        "Error creando cuenta"
      );

    }

  };


  return (

    <div
      style={{
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}
    >


      <div
        className="card"
        style={{
          width:"350px",
          textAlign:"center"
        }}
      >


        <h1>
         Crear cuenta
        </h1>


        <p>
          Reserva tu próxima cita
        </p>


        <form onSubmit={handleRegister}>


          <input
            placeholder="Nombre"
            value={name}
            onChange={(e)=>
              setName(e.target.value)
            }
          />


          <br/>
          <br/>


          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
          />


          <br/>
          <br/>


          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e)=>
              setPassword(e.target.value)
            }
          />


          <br/>
          <br/>


          <button type="submit">
            Registrarme 
          </button>


        </form>


        <p style={{marginTop:"20px"}}>

          ¿Ya tienes cuenta?

          <br/>

          <Link to="/">
            Iniciar sesión
          </Link>

        </p>


      </div>


    </div>

  );
}


export default Register;