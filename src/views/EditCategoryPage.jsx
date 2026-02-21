import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryForm from "../components/CategoryForm";
import AppPageWrapper from "../components/AppPageWrapper";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { apiRequest } from "../helpers/apiRequest";
import { Typography, IconButton, Box, CircularProgress, Alert, Skeleton } from "@mui/material";

export default function EditCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    if(!id) {
      return;
    }
    getCategory();
  }, [id]);

  const getCategory = async () => {
    try {
      setLoading(true);
      const response = await apiRequest(`/categories/${id}`, "GET");
      setCategoryData(response.data);
      setError("");
    } catch (err) {
      setError(err.message || "Error al cargar la categoría");
      console.error("Error al cargar la categoría:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      await apiRequest(`/categories/${id}`, "PUT", data);
      navigate(`/categories/${id}`);
    } catch (err) {
      setError(err.message || "Error al actualizar la categoría");
      throw err;
    }
  };

  if (loading) {
    return (
      <AppPageWrapper>
        <Skeleton variant="rectangular" height={80} sx={{  borderRadius: 3, mb: 4 }} />
        <Skeleton variant="rectangular" width="60%" height={40}  sx={{  borderRadius: 3, mb: 4 }} />
        <Skeleton variant="rectangular" width="60%"height={40} sx={{  borderRadius: 3, mb: 4 }} />
        <Skeleton variant="rectangular" width="60%" height={40} sx={{  borderRadius: 3, mb: 4 }} />
      </AppPageWrapper>
    );
  }

  if (error && !categoryData) {
    return (
      <AppPageWrapper title="Error">
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <IconButton onClick={() => navigate("/categories")}>
          <ArrowBackIcon color="primary" />
          Volver a categorías
        </IconButton>
      </AppPageWrapper>
    );
  }

  return (
    <AppPageWrapper title={`Editar: ${categoryData?.name || ""}`}>
      <Box sx={{ mb: 5,}} >
        <IconButton onClick={() => navigate(-1)} sx={{ color: 'text.primary' }}>
          <ArrowBackIcon color="primary" />
        </IconButton>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Typography sx={{ color: "text.secondary", mb: 4 }}>
        Edita los detalles de la categoría.
      </Typography>

      {categoryData && (
        <>
          <CategoryForm 
            onSubmit={handleSubmit} 
            initialData={categoryData}
            // onDelete={handleDelete}
            isEditMode={true}
          />
        </>
      )}
    </AppPageWrapper>
  );
}