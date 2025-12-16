import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Skeleton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";

import AppPageWrapper from "../components/AppPageWrapper";
import { apiRequest } from "../helpers/apiRequest";

export default function NewLinkPage() {
  const [formData, setFormData] = useState({
    link: "",
    description: "",
    comment: "",
    categoryId: "",
    icon: "",
    userId: "",
  });

  const [formErrors, setFormErrors] = useState({
    link: "",
    description: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

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

    setLoading(true);

    try {
      await apiRequest("/links", "POST", formData);
      setSuccess("Enlace creado con éxito.");

      setTimeout(() => {
        navigate("/links/all");
      }, 2000);
    } catch (err) {
      setError(err.message || "Error al crear enlace");
    } finally {
      setLoading(false);
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


  useEffect(() => {
    apiRequest("/categories", "GET").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <AppPageWrapper title="Agregar nuevo enlace">
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
        <Typography sx={{ color: "text.secondary", mb: 4 }}>
          Guarda un nuevo enlace en tu colección.
        </Typography>

        {loading ? (
          <Box>
            <Skeleton height={50} sx={{ mb: 2 }} />
            <Skeleton height={50} sx={{ mb: 2 }} />
            <Skeleton height={50} sx={{ mb: 2 }} />
            <Skeleton height={50} sx={{ mb: 2 }} />
          </Box>
        ) : (
          <>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleSubmit}>
              
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                  fullWidth
                  label="URL *"
                  name="link"
                  placeholder="http://example.com"
                  error={Boolean(formErrors.link)}
                  value={formData.link}
                  onChange={handleChange}
                />
              </Box>

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
                sx={{ mb: 4 }}
              />

              <FormControl fullWidth sx={{ mb: 4 }} error={Boolean(formErrors.categoryId)}>
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="categoryId"
                  label="Category"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  <MenuItem value="">Sin categoría</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color='primary'
              >
                Guardar enlace
              </Button>

            </form>
          </>
        )}
      </Box>
    </AppPageWrapper>
  );
}
