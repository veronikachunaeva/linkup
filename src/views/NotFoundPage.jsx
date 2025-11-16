import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
        backgroundColor: "background.paper",
        color: "text.primary",
        borderRadius: 1,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: 80, sm: 120 },
          fontWeight: "bold",
          mb: 2,
          color: "primary.main",
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        sx={{ mb: 2, color: "text.secondary" }}
      >
        Página no encontrada
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 4, maxWidth: 400, color: "text.secondary" }}
      >
        Lo sentimos, la página que buscas no existe o fue movida.
        Por favor, verifica la URL o regresa al inicio.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
      >
        Volver al inicio
      </Button>
    </Box>
  );
}
