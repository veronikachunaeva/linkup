import { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import iconsList from "../components/IconsList";
import AppPageWrapper from "../components/AppPageWrapper";
import { apiRequest } from "../helpers/apiRequest";

export default function CategoryDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [deleteCategory, setDeleteCategory] = useState(false);

  useEffect(() => {
    const loadCategoryAndLinks = async () => {
      setLoading(true);
      try {
        const categoryData = await apiRequest(`/categories/${id}`, "GET");
        setCategory(categoryData.data);
      
        const linksData = await apiRequest(`/links/category/${id}`, "GET");
        setLinks(linksData.data || []);

      } catch (e) {
        console.error("Error al cargar la categoría: ", e);
      } finally {
        setLoading(false);
      }
    };
    loadCategoryAndLinks();
  }, [id]);

  const handleViewChange = (_, nextView) => {
    if (nextView !== null) setView(nextView);
  };

  const confirmDelete = async () => {
    try {
      await apiRequest(`/categories/${id}`, "DELETE");
      navigate("/categories");
    } catch (err) {
      console.error('Error al eliminar la categoría: ', err);
    }
  };

  const handleDeleteLink = async (id) => {
    if (!window.confirm("Remove this link?")) return;
    try {
      await apiRequest(`/links/${id}`, "DELETE");
      setLinks((prev) => prev.filter((e) => e._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredLinks = links.filter(link =>
    link.comment?.toLowerCase().includes(search.toLowerCase()) || 
    link.description?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <AppPageWrapper>
        <Skeleton variant="rectangular" height={80} sx={{  borderRadius: 3, mb: 4 }} />
        <Grid container spacing={2} item xs={12} sm={6} md={4} >
          {[...Array(4)].map((_, idx) => (
            <Grid key={idx}  size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{  borderRadius: 3, p: 2 }}>
                <Skeleton variant="circular" width={50} height={50}  />
                <Skeleton width="80%" sx={{ mt: 2}} />
                <Skeleton width="60%" />
              </Card>
            </Grid>
          ))}
        </Grid>
      </AppPageWrapper>
    );
  }

  if (!category) {
    return (
      <AppPageWrapper title="Categoría no encontrada">
        <Box sx={{ mb: 5,}} >
          <IconButton onClick={() => navigate('/categories')} sx={{ color: 'text.primary' }}>
            <ArrowBackIcon color="primary" />
          </IconButton>
        </Box>
        <Typography>No se ha encontrado la categoría solicitada.</Typography>
      </AppPageWrapper>
    );
  }

  const IconComponent = category.icon ? iconsList[category.icon] : null;

  const LinkGridItem = ({ link }) => (
    <Grid key={link._id} size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: "background.default",
          borderRadius: "14px",
          borderLeft: "2px solid",
          borderColor: category.color,
          transition: "0.25s",
          cursor: "pointer",
          boxShadow: `0 4px 12px ${category.color}40`,
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `0 8px 24px ${category.color}80`
          }
        }}
      >
        <CardContent sx={{
          display: "flex",
          flexDirection: "column",
          p: 3,
          position: "relative",
          height: "100%"
        }}>
          {link.description && (
            <Typography sx={{ mb: 1, fontSize: '1.2rem' }}>
              {link.description}
            </Typography>
          )}

          <Typography sx={{ wordBreak: "break-all", mb: 2 }}>
            <a
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: category.color, fontSize: '0.9rem' }}
            >
              {link.link}
            </a>
          </Typography>

          {link.comment && (
            <Typography sx={{ mb: 1, fontSize: '0.7rem' }}>
              {link.comment}
            </Typography>
          )}

          <CardActions sx={{ p: 0, pt: 1, mt: 'auto', justifyContent: 'flex-end' }}>
            <Button
              component={NavLink}
              to={`/links/edit/${link._id}`}
              variant="outlined"
              color= 'warning'
              sx={{marginLeft: 'auto', minWidth: "auto", p: 1}}
            >
              <EditIcon  />
            </Button>
            <Button
              variant="outlined"
              color= 'error'
              sx={{minWidth: "auto", p: 1}}
              onClick={() => handleDeleteLink(link._id)}
            >
              <DeleteIcon  />
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );

  const LinkListItem = ({ link }) => (
    <Card
      key={link._id}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "background.default",
        borderRadius: "14px",
        borderLeft: "2px solid",
        borderColor: category.color,
        transition: "0.25s",
        cursor: "pointer",
        boxShadow: `0 4px 12px ${category.color}40`,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 8px 24px ${category.color}80`
        },      
        mb: 2,
      }}
    >
      <CardContent sx={{ position: "relative", width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent:"space-between", gap: 2 }}>
          <Box>
            {link.description && (
              <Typography sx={{ mb: 1, fontSize: '1.2rem' }}>
                {link.description}
              </Typography>
            )}
            <Typography sx={{ wordBreak: "break-all", mb: 2 }}>
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: category.color, fontSize: '0.9rem' }}
              >
                {link.link}
              </a>
            </Typography>
          </Box>
          <CardActions sx={{ p: 0, pt: 1, justifyContent: 'flex-end' }}>
            <Button
              component={NavLink}
              to={`/links/edit/${link._id}`}
              variant="outlined"
              color= 'warning'
              sx={{marginLeft: 'auto', minWidth: "auto", p: 1}}
            >
              <EditIcon  />
            </Button>
            <Button
              variant="outlined"
              color= 'error'
              sx={{minWidth: "auto", p: 1}}
              onClick={() => handleDeleteLink(link._id)}
            >
              <DeleteIcon  />
            </Button>
          </CardActions>
        </Box>

        
        {link.comment && (
          <Typography sx={{ mb: 1, mt: 1, fontSize: '0.7rem' }}>
            {link.comment}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <AppPageWrapper>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              bgcolor: `${category.color}22`,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {IconComponent && <IconComponent sx={{ fontSize: 36, color: category.color }} />}
          </Box>
          <Typography variant="h1" sx={{
            fontWeight: 600,
            fontSize: '3rem',
            }}>
            {category.name}
          </Typography>
        </Box>
        <Box sx={{ mb: 5,}} >
          <IconButton onClick={() => navigate(-1)} sx={{ color: 'text.primary' }}>
            <ArrowBackIcon  color="primary"/>
          </IconButton>
        </Box>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontSize: "1.2rem" }}>
              {filteredLinks.length} Enlaces
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color= 'warning'
            startIcon={<EditIcon  />}
            sx={{marginLeft: 'auto'}}
            onClick={() => navigate(`/categories/edit/${category._id}`)}
          >
              Editar categoría
          </Button>
          <Button
            variant="outlined"
            color= 'error'
            startIcon={<DeleteIcon  />}
            onClick={() => setDeleteCategory(true)}
          >
              Eliminar categoría
          </Button>
          <ConfirmDialog
            open={deleteCategory}
            onClose={() => setDeleteCategory(false)}
            title={` categoría ${category.name}`} 
            onConfirm={confirmDelete}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 4,
            p: 1,
            borderRadius: 3
          }}
        >
          <TextField
            fullWidth
            placeholder={`Buscar en ${category.name}...`}
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
        
          <ToggleButtonGroup
            exclusive
            value={view}
            onChange={handleViewChange}
            sx={{
              borderRadius: 3,
              "& .MuiToggleButton-root": {
                px: 2,
                py: 1,
                color: "text.primary",
                "&.Mui-selected": {
                  olor: "text.secondary",
                },
              },
            }}
          >
            <ToggleButton value="grid" aria-label="grid view">
              <ViewModuleIcon color='primary'/>
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon color='primary' />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

  
        {filteredLinks.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                  No se han encontrado enlaces en esta categoría.
              </Typography>
              <Button 
                  variant="contained"
                  color='primary' 
                  onClick={() => navigate('/links/new')}
              >
                  Agregar enlace
              </Button>
          </Box>
        ) : view === "grid" ? (
          <Grid container spacing={3}>
            {filteredLinks.map((link) => (
              <LinkGridItem key={link._id} link={link} />
            ))}
          </Grid>
        ) : (
          <Box sx={{ mt: 2 }}>
            {filteredLinks.map((link) => (
              <LinkListItem key={link._id} link={link} />
            ))}
          </Box>
        )}
      </AppPageWrapper>
    </>
  );
}