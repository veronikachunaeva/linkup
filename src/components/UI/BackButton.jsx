import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton({
  label = "Volver",
  to = -1,
}) {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(to)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.2,
        px: 2.2,
        py: 1.2,

        bgcolor: "#ffffff",
        color: "#111",

        borderRadius: 2, 
        width: "fit-content",
        cursor: "pointer",
        userSelect: "none",

        boxShadow: "0px 4px 10px rgba(0,0,0,0.22)",
        transition: "all 0.15s ease",

        "&:hover": {
          bgcolor: "#f2f2f2", 
        },

        "&:active": {
          bgcolor: "#e8e8e8",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.25)",
        },
      }}
    >
      <ArrowBackIcon sx={{ fontSize: 20 }} />

      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: 500,
          letterSpacing: "0.15px",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
