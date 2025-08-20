import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

export default function Header() {
  const [open, setOpen] = useState(false); // cerrado
  const navigate = useNavigate();

  const deleteToken = () => {
    sessionStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="d-flex flex-column text-center">
      <button
        type="button"
        className="btn btn-warning d-flex align-items-center justify-content-center"
        onClick={() => setOpen(!open)}
        aria-controls="navigation-buttons"
        aria-expanded={open}
      >
        MICHELANGELO GESTIÓN DE RESIDUOS
        <span
          style={{
            marginLeft: "10px",
            fontSize: "1.5rem",
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s"
          }}
        >
        🍕
        </span>
      </button>

      <Collapse in={open}>

        <div id="navigation-buttons">
          <div className="d-grid gap-2 mt-2">
            <Button variant="outline-primary" onClick={() => navigate("/wastestore")}>
              Residuos Almacenados 📦
            </Button>
            <Button variant="outline-info" onClick={() => navigate("/searchwaste")}>
              Buscar Residuos 🔍
            </Button>
            <Button variant="outline-dark" onClick={deleteToken}>
              ⚠️ Cerrar sesión ⚠️
            </Button>
          </div>
        </div>

      </Collapse>
    </div>
  );
}
