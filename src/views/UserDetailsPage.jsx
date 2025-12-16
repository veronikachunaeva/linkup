import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import AppPageWrapper from "../components/AppPageWrapper";
import { apiRequest } from "../helpers/apiRequest";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest(`/users/${id}`).then(res => setUser(res.data));
  }, [id]);

  if (!user) return null;

  return (
    <AppPageWrapper title={`Detalles del perfil de ${user?.name}`}>
      <IconButton onClick={() => navigate('/users')} sx={{ color: 'text.primary' }}>
        <ArrowBackIcon color="primary" />
      </IconButton>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2, mt: 4 }}>
        <Avatar src={user.avatar} sx={{ width: 80, height: 80 }} />
        <Typography variant="h5">{user.name}</Typography>
      </Box>
      <Typography>Email: {user.email}</Typography>
      <Typography>Tel: {user.tel || "-"}</Typography>
      <Typography>Rol: {user.rol}</Typography>
    </AppPageWrapper>
  );
}
