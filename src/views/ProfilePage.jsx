import { useContext } from "react";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import AppPageWrapper from "../components/AppPageWrapper";
import { AuthContext } from "../context/AuthContext"; 
export default function ProfilePage () {
  const { user } = useContext(AuthContext); 

  const enlaces = [
    { title: "Todos los enlaces", to: "/links/all" },
    { title: "Crear enlace", to: "/links/new" },
  ];

  const notas = [
    { title: "Todas las notas", to: "/notes/all" },
    { title: "Crear nota", to: "/notes/new" },
  ];

  return (
    <AppPageWrapper title={`Hola, ${user?.name || "Usuario"}`}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Enlaces
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {enlaces.map((item) => (
            <Grid item xs={12} sm={6} key={item.to}>
              <CardActionArea component={NavLink} to={item.to}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" sx={{ mb: 2 }}>
          Notas
        </Typography>
        <Grid container spacing={2}>
          {notas.map((item) => (
            <Grid item xs={12} sm={6} key={item.to}>
              <CardActionArea component={NavLink} to={item.to}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Box>
    </AppPageWrapper>
  );
}
