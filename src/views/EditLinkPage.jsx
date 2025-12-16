import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Box, TextField, Button, Skeleton, FormControl, InputLabel, Select, MenuItem, } from "@mui/material";

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
  const [formErrors, setFormErrors] = useState({
    link: "",
    description: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);
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
        comment: data.data.comment || "",
        description: data.data.description || "",
        categoryId: data.data.categoryId || "",
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
  useEffect(() => {
    try {
      apiRequest("/categories", "GET").then((res) => {
        setCategories(res.data);
        });
      } catch (error) {
        console.error(error);
      }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setError("Por favor, corrija los errores en el formulario.");
      return;
    }

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

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.link.trim()) {
      errors.link = "Enlace obligatorio";
      isValid = false;
    } else {
      try {
        const url = new URL(formData.link);
        if (!url.protocol.startsWith('http')) {
          errors.link = "URL debe comenzar con http:// o https://";
          isValid = false;
        }
      } catch {
        errors.link = "URL no válida (por ejemplo: https://example.com)";
        isValid = false;
      }
    }

    if (!formData.description.trim()) {
      errors.description = "Descripción obligatoria";
      isValid = false;
    } else if (formData.description.trim().length < 3) {
      errors.description = "Descripción debe tener al menos 3 caracteres";
      isValid = false;
    } else if (formData.description.trim().length > 200) {
      errors.description = "Descripción debe tener menos de 200 caracteres";
      isValid = false;
    }

    if (!formData.categoryId) {
      errors.categoryId = "Categoría obligatoria";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <AppPageWrapper title="Editar Enlace">
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
                error={Boolean(formErrors.link)}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Nombre"
                name="description"
                value={formData.description}
                error={Boolean(formErrors.description)}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Descripción"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth sx={{ mb: 4 }} error={Boolean(formErrors.categoryId)}>
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="categoryId"
                  label="Category"
                  value={formData.categoryId}
                  onChange={handleChange}
                  displayEmpty 
                >
                  <MenuItem value="">Sin categoría</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem
                      key={cat._id}
                      value={cat._id}
                      selected={formData.categoryId === cat._id}
                      >
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
