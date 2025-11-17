import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import AppPageWrapper from "../components/AppPageWrapper";
import { apiRequest } from "../helpers/apiRequest";

export default function NewNotePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: ""
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
// validacion
    try {
      const data = await apiRequest("/notes", "POST", formData);
      setSuccess(data.msg || "Nota creada exitosamente!");
      setFormData({ title: "", description: "", status: "", priority: "" });
      navigate("/notes/all"); 
    } catch (err) {
      setError(err.message || "Error al crear nota");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppPageWrapper title="Nueva Nota">
      <Box sx={{ maxWidth: 500, mt: 6, p: 4, backgroundColor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
        {loading ? (
          <Box>
            <Skeleton height={40} sx={{ mb: 2 }} />
            <Skeleton height={40} sx={{ mb: 2 }} />
            <Skeleton height={40} sx={{ mb: 2 }} />
            <Skeleton height={40} sx={{ mb: 2 }} />
          </Box>
        ) : (
          <>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Título" name="title" value={formData.title} onChange={handleChange} required sx={{ mb: 2 }} />
              <TextField fullWidth label="Descripción" name="description" value={formData.description} onChange={handleChange} required sx={{ mb: 2 }} />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="status-label">Estado</InputLabel>
                <Select labelId="status-label" name="status" value={formData.status} onChange={handleChange} required>
                  <MenuItem value="pending">Pendiente</MenuItem>
                  <MenuItem value="progress">En progreso</MenuItem>
                  <MenuItem value="completed">Completada</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="priority-label">Prioridad</InputLabel>
                <Select labelId="priority-label" name="priority" value={formData.priority} onChange={handleChange} required>
                  <MenuItem value="low">Baja</MenuItem>
                  <MenuItem value="medium">Media</MenuItem>
                  <MenuItem value="high">Alta</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" color="primary" fullWidth>Crear Nota</Button>
            </form>
          </>
        )}
      </Box>
    </AppPageWrapper>
  );
}
