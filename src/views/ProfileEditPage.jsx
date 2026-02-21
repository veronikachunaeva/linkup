import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../helpers/apiRequest";
import BackButton from "../components/UI/BackButton";
import AppPageWrapper from "../components/AppPageWrapper";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Alert
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ProfileEditPage() {
  const { user, login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    tel: "",
    avatar: "",
    password: "",
    passwordConfirm: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      try{
      apiRequest(`/users/${user.id}`).then(res =>  {
        
        setForm(
          form => ({
            ...form,
            name: res.data.name || "",
            email: res.data.email || "",
            tel: res.data.tel || "",
            avatar: res.data.avatar || "",
          })
        )
        
      }
    );
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = async () => {
    setError("");
    setSuccess("");

    if (form.password && form.password !== form.passwordConfirm) {
      return setError("Las contraseñas no coinciden");
    }

    setLoading(true);

    try {
      const body = {
        name: form.name,
        tel: form.tel,
        avatar: form.avatar,
        email: user.email
      };

      if (form.password) {
        body.password = form.password;
      }

      const res = await apiRequest("/users/profile/edit", "PUT", body);

      login(res.data, localStorage.getItem("token"));

      setSuccess("Perfil actualizado correctamente");
      setForm({ ...form, password: "", passwordConfirm: "" });
    } catch (err) {
      setError(err.message || "Error al actualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <AppPageWrapper title="Editar perfil">

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <IconButton onClick={() => navigate("/profile")} sx={{ color: 'text.primary', mb: 3 }}>
        <ArrowBackIcon  color="primary"/>
      </IconButton>

      <TextField
        label="Nombre"
        name="name"
        fullWidth
        value={form.name}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Email"
        value={user.email}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />

      <TextField
        label="Teléfono"
        name="tel"
        fullWidth
        value={form.tel}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Avatar (URL)"
        name="avatar"
        fullWidth
        value={form.avatar}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Nueva contraseña"
        name="password"
        type="password"
        fullWidth
        value={form.password}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Confirmar contraseña"
        name="passwordConfirm"
        type="password"
        fullWidth
        value={form.passwordConfirm}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />

      <TextField
        label="Rol"
        value={user.rol}
        fullWidth
        disabled
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={save}
        disabled={loading}
      >
        Guardar cambios
      </Button>
    </AppPageWrapper>
  );
}
