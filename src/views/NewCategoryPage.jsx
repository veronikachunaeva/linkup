import CategoryForm from "../components/CategoryForm";
import AppPageWrapper from "../components/AppPageWrapper";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../helpers/apiRequest";
import { Typography, IconButton } from "@mui/material";

export default function NewCategoryPage() {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    await apiRequest("/categories", "POST", data);
    navigate("/categories");
  };

  return (
    <AppPageWrapper title="Agregar nueva categoría">
        <Typography sx={{ color: "text.secondary", mb: 4 }}>
          Crea una nueva categoría para organizar tus enlaces.
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon color="primary" />
        </IconButton>
        <CategoryForm onSubmit={handleSubmit} />
    </AppPageWrapper>
  )
}

