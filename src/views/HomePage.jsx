import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppPageWrapper from "../components/AppPageWrapper";
import { AuthContext } from "../context/AuthContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function HomePage () {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return ( 
    <AppPageWrapper
      title="Bienvenido a LinkUp"
    >
      <Box sx={{ color: "text.primary", lineHeight: 1.7 }}>
        <p>
          Con LinkUp podés guardar todo lo que quieras recordar: páginas que te interesan,
          ideas rápidas, recordatorios, recursos para el laburo o la facultad, y lo que
          se te ocurra. Todo queda ordenado y lo podés encontrar al toque.
        </p>

        <p style={{ marginTop: "16px" }}>
          Es fácil, cómodo y está pensado para usarse todos los días.
          Registrate y empezá a armar tu propio espacio personal.
        </p>

        <Box sx={{ mt: 3 }}>
          { user ? (
            <Button
              variant="contained"
              color="primary"
              component={NavLink}
              to="/categories/new"
            >
              Crear categoría
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              component={NavLink}
              to="/register"
            >
              Crear cuenta
            </Button>
          ) }
        </Box>
      </Box>
    </AppPageWrapper>
  );
}