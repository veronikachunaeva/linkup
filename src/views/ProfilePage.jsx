import { useContext, useEffect, useState } from "react";
import { apiRequest } from "../helpers/apiRequest";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AppPageWrapper from "../components/AppPageWrapper";
import AppLoader from "../components/AppLoader";
import ThemeToggle from "../components/UI/ThemeToggle";
import TextRow from "../components/UI/TextRow";
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider
} from "@mui/material";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  
  const [profileData, setProfileData] = useState(null);
  
    useEffect(() => {
      try {
        apiRequest(`/users/profile`, 'POST', user).then(res => setProfileData(res.data));
      } catch (error) {
        console.error('Error al obtener los datos del perfil', error);
      }
    }, [user]);

  if (!user) return null;

  return (
    <>
    <AppPageWrapper
      title="Mi perfil"
    >
      { !profileData && <AppLoader /> }
      { profileData &&
      <Box>
        
        <Box sx={{ mb: 3, ml: 'auto', width: 'max-content' }}>
          <ThemeToggle />
        </Box>

        <Stack spacing={2} sx={{ mb: 3 }}>
          <TextRow label="Nombre" value={profileData?.name || "—"} />
          <TextRow label="Email" value={profileData?.email || "—"} />
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>
          <TextRow label="Teléfono" value={profileData?.tel || "—"} />
          <TextRow label="Rol" value={profileData?.rol} />
        </Stack>

        <Button
          component={NavLink}
          to="/profile/edit"
          variant="contained"
          sx={{ mt: 4 }}
        >
          Editar perfil
        </Button>
      </Box>
      }
    </AppPageWrapper>
    </>
  );
}

