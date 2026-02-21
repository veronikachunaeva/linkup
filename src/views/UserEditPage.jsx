import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, IconButton, Button, Select, MenuItem, Avatar, Typography } from "@mui/material";
import { apiRequest } from "../helpers/apiRequest";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppPageWrapper from "../components/AppPageWrapper";

export default function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    tel: "",
    avatar: "",
    password: "",
    passwordConfirm: "",
    email: "",
    rol: "cliente",
  });

  useEffect(() => {
    try{
      apiRequest(`/users/${id}`).then(res => setForm(
        form => ({
        ...form,
        name: res.data.name || "",
        tel: res.data.tel || "",
        email: res.data.email || "",
        avatar: res.data.avatar || "",
      })
      ));
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const save = async () => {
    try {
      if (!form.rol) {
        return;
      }
      await apiRequest(`/users/edit/${id}`, "PUT", form);
      navigate("/users");
    } catch (err) {
      console.error(err);
    }
  };

  if (!form) return null;

  return (
    <AppPageWrapper title={`Detalles del perfil de ${form?.name}`}>
      <IconButton onClick={() => navigate('/users')} sx={{ color: 'text.primary' }}>
        <ArrowBackIcon color="primary" />
      </IconButton>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2, mt: 4 }}>
        <Avatar src={form.avatar} sx={{ width: 80, height: 80 }} />
        <Typography variant="h5">{form.name}</Typography>
      </Box>
      <Typography sx={{ mb: 3, }}>Email: {form.email}</Typography>
      <Typography sx={{ mb: 3, }}>Tel: {form.tel || "-"}</Typography>
      <Select
        value={form.rol}
        label="Rol"
        onChange={e => setForm({ ...form, rol: e.target.value })}
        required
        displayEmpty
        sx={{ mb: 3}}
      >
        <MenuItem value="cliente" selected={form.rol === "cliente"}>Cliente</MenuItem>
        <MenuItem value="admin" selected={form.rol === "admin"}>Admin</MenuItem>
      </Select>
      <Box>
        <Button variant="contained" onClick={save}>
          Guardar
        </Button>
      </Box>
    </AppPageWrapper>
  );
}
