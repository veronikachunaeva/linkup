import { NavLink, useNavigate } from "react-router-dom";
import AppPageWrapper from "../components/AppPageWrapper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function HomePage () {
  const navigate = useNavigate();
  return ( 
    <AppPageWrapper
      title="Bienvenido a LinkUp"
    >
      <Box sx={{ color: "text.primary", lineHeight: 1.7 }}>
        <p>
          Con MarkFlow podés guardar todo lo que quieras recordar: páginas que te interesan,
          ideas rápidas, recordatorios, recursos para el laburo o la facultad, y lo que
          se te ocurra. Todo queda ordenado y lo podés encontrar al toque.
        </p>

        <p style={{ marginTop: "16px" }}>
          Es fácil, cómodo y está pensado para usarse todos los días.
          Registrate y empezá a armar tu propio espacio personal.
        </p>

        <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/register")}
        >
          Crear cuenta
        </Button>
          {/* <Button
            component={NavLink}
            to="/register"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              px: 4,
              py: 1.2
            }}
          >
            Crear cuenta
          </Button> */}
        </Box>
      </Box>
    </AppPageWrapper>
  );
}