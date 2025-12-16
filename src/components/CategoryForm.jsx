import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
  Divider,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import iconsList from "../components/IconsList";

const colors = [
  "#E53935", "#FB8C00", "#FDD835",
  "#43A047", "#1E88E5", "#5E35B1",
  "#8D6E63", "#546E7A",
];

export default function CategoryForm({ 
  onSubmit, 
  initialData = {}, 
  onDelete,
  isEditMode = false 
}) {
  const initialIconKey = initialData.icon || Object.keys(iconsList)[0];
  const [name, setName] = useState(initialData.name || "");
  const [icon, setIcon] = useState(initialIconKey);
  const [color, setColor] = useState(initialData.color || colors[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Обновляем состояние при изменении initialData
  useEffect(() => {
    if (initialData.name) setName(initialData.name);
    if (initialData.icon) setIcon(initialData.icon);
    if (initialData.color) setColor(initialData.color);
  }, [initialData]);

  const handleSave = async () => {
    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await onSubmit({ name: name.trim(), icon, color });
    } catch (err) {
      setError(err.message || "Error al guardar la categoría");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Box sx={{ mx: "auto", mt: 4 }}>
      <Card
        sx={{
          backgroundColor: "background.secondary",
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          '--Paper-shadow': 'none !important',
          '--Paper-overlay': 'none !important',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Typography sx={{ mb: 1, fontWeight: 500 }}>Nombre de la categoría</Typography>
          <TextField
            fullWidth
            placeholder="El nombre de la categoría..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            sx={{ mb: 4 }}
            error={!!error && error.includes("nombre")}
            helperText={error && error.includes("nombre") ? error : ""}
          />

          <Typography sx={{ mb: 1, fontWeight: 500 }}>Seleccionar icono</Typography>
          <Grid container spacing={1.5} sx={{ mb: 4 }}>
            {Object.keys(iconsList).map((key) => {
              const Icon = iconsList[key];
              return (
                <Grid item key={key}>
                  <IconButton
                    onClick={() => setIcon(key)}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: icon === key ? "action.selected" : "transparent",
                      border: icon === key ? `2px solid ${color}` : "none",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      }
                    }}
                  >
                    <Icon sx={{ 
                      fontSize: 28,
                      color: icon === key ? color : "inherit"
                    }} />
                  </IconButton>
                </Grid>
              );
            })}
          </Grid>

          <Typography sx={{ mb: 1, fontWeight: 500 }}>Elige el color</Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 4, flexWrap: "wrap" }}>
            {colors.map((c) => (
              <Box
                key={c}
                onClick={() => setColor(c)}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: c,
                  border: color === c ? "3px solid #fff" : "2px solid transparent",
                  outline: color === c ? `2px solid ${c}` : "none",
                  cursor: "pointer",
                  boxShadow: "0 0 6px rgba(0,0,0,0.4)",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.1)" }
                }}
              />
            ))}
          </Box>

          <Button
              color="primary"
              variant="contained"
              onClick={handleSave}
              disabled={loading || !name.trim()}
              sx={{ 
                flex: isEditMode ? 2 : 1,
                ml: isEditMode ? 2 : 0
              }}
            >
              {isEditMode ? (
                "Guardar cambios"
              ) : (
                "Crear categoría"
              )}
            </Button>

          {/* Превью категории */}
          {/* <Box sx={{ 
            mb: 4, 
            p: 3, 
            borderRadius: 2, 
            backgroundColor: color + "20", // 20 - прозрачность 12.5%
            borderLeft: `4px solid ${color}`
          }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              Vista previa
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: "50%", 
                backgroundColor: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {iconsList[icon] && 
                  React.createElement(iconsList[icon], { 
                    sx: { fontSize: 24, color: "#fff" } 
                  })
                }
              </Box>
              <Typography variant="h6" sx={{ color: color }}>
                {name || "Nombre de categoría"}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
            {isEditMode && onDelete && (
              <Button
                color="error"
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
                sx={{ flex: 1 }}
              >
                Eliminar categoría
              </Button>
            )}
            
            <Button
              color="primary"
              variant="contained"
              onClick={handleSave}
              disabled={loading || !name.trim()}
              sx={{ 
                flex: isEditMode ? 2 : 1,
                ml: isEditMode ? 2 : 0
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isEditMode ? (
                "Guardar cambios"
              ) : (
                "Crear categoría"
              )}
            </Button>
          </Box> */}
        </CardContent>
      </Card>
    </Box>
  );
}