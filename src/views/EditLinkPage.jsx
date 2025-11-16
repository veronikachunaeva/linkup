import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";

import AppPageWrapper from "../components/AppPageWrapper";
import { apiRequest } from "../helpers/apiRequest";

export default function EditLinkPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    link: "",
    group: "",
    comment: "",
    description: "",
    icon: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getLink = async () => {
    try {
      setLoading(true);
      const data = await apiRequest(`/links/${id}`, "GET");
      setFormData({
        link: data.data.link || "",
        group: data.data.group || "",
        comment: data.data.comment || "",
        description: data.data.description || "",
        icon: data.data.icon || "",
      });
    } catch (err) {
      setError(err.message || "Error al cargar el enlace");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLink();
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
      const data = await apiRequest(`/links/${id}`, "PUT", formData);
      setSuccess(data.msg || "Enlace actualizado exitosamente!");
      navigate("/links/all"); 
    } catch (err) {
      setError(err.message || "Error al actualizar enlace");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppPageWrapper title="Editar Enlace">
      <Box
        sx={{
          maxWidth: 500,
          mt: 6,
          p: 4,
          backgroundColor: "background.paper",
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
            <Skeleton height={40} sx={{ mb: 2 }} />
          </Box>
        ) : (
          <>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Grupo"
                name="group"
                value={formData.group}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Comentario"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Icono (URL)"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={saving}>
                {saving ? "Guardando..." : "Actualizar Enlace"}
              </Button>
            </form>
          </>
        )}
      </Box>
    </AppPageWrapper>
  );
}
