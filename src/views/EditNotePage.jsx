import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

import AppPageWrapper from "../components/AppPageWrapper";
import { apiRequest } from "../helpers/apiRequest";

export default function NotesEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const data = await apiRequest(`/notes/${id}`, "GET");
        setFormData({
          title: data.data.title,
          description: data.data.description,
          status: data.data.status,
          priority: data.data.priority,
        });
      } catch (err) {
        setError(err.message || "Error al cargar la nota");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const data = await apiRequest(`/notes/${id}`, "PUT", formData);
      setSuccess(data.msg || "Nota actualizada exitosamente!");
      navigate("/notes/all"); 
    } catch (err) {
      setError(err.message || "Error al actualizar la nota");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppPageWrapper title="Editar Nota">
      <Box
        sx={{
          maxWidth: 500,
          mt: 6,
          p: 4,
          backgroundColor: "background.secondary",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
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
              <TextField
                fullWidth
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="status-label">Estado</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={formData.status}
                  label="Estado"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                  <MenuItem value="En progreso">En progreso</MenuItem>
                  <MenuItem value="Completada">Completada</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="priority-label">Prioridad</InputLabel>
                <Select
                  labelId="priority-label"
                  name="priority"
                  value={formData.priority}
                  label="Prioridad"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Baja">Baja</MenuItem>
                  <MenuItem value="Media">Media</MenuItem>
                  <MenuItem value="Alta">Alta</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={saving}
              >
                {saving ? "Guardando..." : "Actualizar Nota"}
              </Button>
            </form>
          </>
        )}
      </Box>
    </AppPageWrapper>
  );
}
