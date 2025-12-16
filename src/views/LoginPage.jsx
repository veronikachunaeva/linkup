import { useState, useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../helpers/apiRequest";

import AppPageWrapper from "../components/AppPageWrapper";
import { AuthContext } from "../context/AuthContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await apiRequest("/users/auth", "POST", formData);

      setSuccess(data.msg || "Inicio de sesión exitoso!");
      const jwt = data.data;
      localStorage.setItem("token", jwt); 
      login(formData, jwt)
      navigate("/profile"); 
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <AppPageWrapper title="Iniciar Sesión">
      <Box
        sx={{
          maxWidth: 400,
          mt: 8,
          p: 4,
          backgroundColor: "background.secondary",
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
          />

          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Iniciar Sesión
          </Button>
        </form>
      </Box>
    </AppPageWrapper>
  );
}
