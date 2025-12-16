import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AppPageWrapper from "../components/AppPageWrapper";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Skeleton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import iconsList from "../components/IconsList";
import { apiRequest } from "../helpers/apiRequest";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/categories", "GET");
      setCategories(data.data);
    } catch(e) {
      console.error("Error al cargar la categoría: ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppPageWrapper title="Categorías">

      <Typography sx={{ mb: 4 }}>
        Organiza tus enlaces por categoría
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: 4,
        }}
      >
        <TextField
          placeholder="Buscar categorías..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            flexGrow: 1,
            "& input": {
              paddingY: 1,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            )
          }}
        />
        <Button
          variant="contained"
          color="primary"
          component={NavLink}
          to="/categories/new"
          startIcon={<AddIcon />}
        >
          Agregar nueva
        </Button>
      </Box>


      { loading &&
      <Grid container spacing={2} item xs={12} sm={6} md={4} >
        {[...Array(3)].map((_, idx) => (
          <Grid key={idx}  size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ borderRadius: 3, p: 2 }}>
              <Skeleton variant="circular" width={50} height={50} />
              <Skeleton width="80%" sx={{ mt: 2 }} />
              <Skeleton width="60%"  />
            </Card>
          </Grid>
        ))}
      </Grid>
        }
      <Grid container spacing={2}>
        {filtered.map(cat => {
          const Icon = cat.icon ? iconsList[cat.icon] : null;

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat._id}>
              <Card
                onClick={() => navigate(`/categories/${cat._id}`)}
                sx={{
                  background: "background.default",
                  borderRadius: "14px",
                  borderLeft: "2px solid",
                  borderColor: cat.color,
                  transition: "0.25s",
                  cursor: "pointer",
                  boxShadow: `0 4px 12px ${cat.color}40`,
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 8px 24px ${cat.color}80`
                  }
                }}
              >
                <CardContent sx={{ p: 3, position: "relative" }}>
                  
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    {cat.name}
                  </Typography>

                  <Typography
                    sx={{
                      background: "background.default",
                      display: "inline-block",
                      px: 1,
                      py: 0.5,
                      fontSize: "0.8rem",
                      color: "text.secondary"
                    }}
                  >
                    {cat.count} enlaces
                  </Typography>

                  {Icon && (
                    <Box sx={{ position: "absolute", bottom: 16, right: 16 }}>
                      <Icon
                        sx={{
                          fontSize: 36,
                          color: cat.color
                        }}
                      />
                    </Box>
                  )}

                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </AppPageWrapper>
  );
}
