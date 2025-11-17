import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import iconsList from "../components/IconsList";

import AppPageWrapper from "../components/AppPageWrapper";
import { apiRequest } from "../helpers/apiRequest";

export default function NewLinkPage() {
  const [formData, setFormData] = useState({
    link: "",
    group: "",
    comment: "",
    description: "",
    icon: "",
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

    try {
      // validacion
      const data = await apiRequest("/links", "POST", formData);
      setSuccess(data.msg || "Enlace creado exitosamente!");
      setFormData({ link: "", group: "", comment: "", description: "", icon: "" });
      navigate("/links/all"); 
    } catch (err) {
      setError(err.message || "Error al crear enlace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppPageWrapper title="Nuevo Enlace">
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
              {/* <TextField
                fullWidth
                label="Icono (URL)"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                sx={{ mb: 3 }}
              /> */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="icon-label">Icono</InputLabel>
                <Select
                  labelId="icon-label"
                  name="icon"
                  value={formData.icon}
                  label="Icono"
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                >
                  {Object.keys(iconsList).map((iconName) => (
                    <MenuItem key={iconName} value={iconName}>
                      {iconName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Crear Enlace
              </Button>
            </form>
          </>
        )}
      </Box>
    </AppPageWrapper>
  );
}
