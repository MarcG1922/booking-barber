import { Link } from "react-router-dom";

function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Dashboard 💈</h1>

      <p>Usuario logueado correctamente</p>

      <div style={{ marginBottom: "20px" }}>
        <Link to="/services">
          Ver servicios
        </Link>
      </div>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;