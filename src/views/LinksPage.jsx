import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import iconsList from "../components/IconsList";
import AppPageWrapper from "../components/AppPageWrapper";
import ConfirmDialog from "../components/ConfirmDialog";
import { apiRequest } from "../helpers/apiRequest";

export default function LinksPage() {
  const [categories, setCategories] = useState([]);
  const [links, setLinks] = useState([]);
  const [deleteLink, setDeleteLink] = useState(null);
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [loadingCat, setLoadingCat] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      setLoadingCat(true);
      const res = await apiRequest("/categories", "GET");
      setCategories(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCat(false);
    }
  };
  
  useEffect(() => {
    getCategories();
  }, []);

  const getLinks = async () => {
    try {
      setLoading(true);
      const data = await apiRequest("/links", "GET");
      setLinks(data.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  const handleViewChange = (_, nextView) => {
    if (nextView !== null) setView(nextView);
  };

  const handleDeleteLink = async (id) => {
    try {
      await apiRequest(`/links/${id}`, "DELETE");
      setLinks((prev) => prev.filter((e) => e._id !== id));
      setDeleteLink(null);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredLinks = links.filter(link =>
    link.comment?.toLowerCase().includes(search.toLowerCase()) || 
    link.description?.toLowerCase().includes(search.toLowerCase())
  );

  const LinkGridItem = ({ link }) => {
    if (!categories[0]) {
      return;
    }
    const category = categories.find(cat => cat._id === link.categoryId)
    const getCategoryIcon = (iconKey) => {
      return iconsList[iconKey] || null;
    };
    const CategoryIcon = category?.icon ? getCategoryIcon(category.icon) : null;

    return (
      <Grid key={link._id} size={{ xs: 12, sm: 6, md: 4 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            background: "background.default",
            borderRadius: "14px",
            borderLeft: "2px solid",
            borderColor: category?.color,
            transition: "0.25s",
            cursor: "pointer",
            boxShadow: `0 4px 12px ${category?.color}40`,
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: `0 8px 24px ${category?.color}80`
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

            {category && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                  gap: 0.5,
                  backgroundColor: `${category?.color}20`,
                  borderRadius: "20px",
                  px: 1.5,
                  py: 0.5,
                  border: `1px solid ${category?.color}40`,
                  mb: 2
                }}
              >
                {CategoryIcon && (
                  <CategoryIcon 
                    sx={{ 
                      fontSize: 14,
                      color: category?.color 
                    }} 
                  />
                )}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: category?.color,
                    fontWeight: 500,
                    fontSize: "0.7rem"
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
            )}

            <Typography sx={{ wordBreak: "break-all", mb: 2 }}>
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: category?.color, fontSize: '0.9rem' }}
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
                onClick={() => setDeleteLink(link._id)}
              >
                <DeleteIcon  />
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    )
  };
  const LinkListItem = ({ link }) => {
    if (!categories[0]) {
      return;
    }
    const category = categories.find(cat => cat._id === link.categoryId)
    const getCategoryIcon = (iconKey) => {
      return iconsList[iconKey] || null;
    };
    const CategoryIcon = category?.icon ? getCategoryIcon(category.icon) : null;
    return (
      <Card
        key={link._id}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "background.default",
          borderRadius: "14px",
          borderLeft: "2px solid",
          borderColor: category?.color,
          transition: "0.25s",
          cursor: "pointer",
          boxShadow: `0 4px 12px ${category?.color}40`,
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `0 8px 24px ${category?.color}80`
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

              {category && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "fit-content",
                    gap: 0.5,
                    backgroundColor: `${category?.color}20`,
                    borderRadius: "20px",
                    px: 1.5,
                    py: 0.5,
                    border: `1px solid ${category?.color}40`,
                    mb: 2
                  }}
                >
                  {CategoryIcon && (
                    <CategoryIcon 
                      sx={{ 
                        fontSize: 14,
                        color: category?.color 
                      }} 
                    />
                  )}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: category?.color,
                      fontWeight: 500,
                      fontSize: "0.7rem"
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
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
    )
  };

  return (
    <AppPageWrapper title="Mis Enlaces">
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ color: "text.secondary"}}>
          Gestión de enlaces sin esfuerzo
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          placeholder={`Buscar enlace...`}
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
      { loading || loadingCat &&
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
        }

      {filteredLinks.length === 0 && !loading && categories.length === 0 && !loadingCat ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                No se han encontrado enlaces.
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
      <ConfirmDialog
        open={deleteLink}
        onClose={() => setDeleteLink(null)}
        title={` enlace ${links.find(link => link._id === deleteLink)?.description}`} 
        onConfirm={() => handleDeleteLink(deleteLink)}
      />
    </AppPageWrapper>
  );
}
