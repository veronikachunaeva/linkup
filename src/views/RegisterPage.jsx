import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../helpers/apiRequest";

import AppPageWrapper from "../components/AppPageWrapper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function RegisterPage () {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    tel: "",
    avatar: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await apiRequest("/users", "POST", formData);
      setSuccess(data.msg);
      setFormData({ name: "", email: "", password: "", tel: "", avatar: "" });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return ( 
      <AppPageWrapper
        title="Registro de Usuario"
      >
      <Box
        sx={{
          maxWidth: 400,
          mt: 8,
          p: 4,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 3
        }}
        >

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Teléfono"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Avatar URL"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Registrarse
          </Button>
        </form>
      </Box>
      </AppPageWrapper>
);
}
