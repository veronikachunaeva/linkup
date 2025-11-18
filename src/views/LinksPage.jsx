import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Skeleton from "@mui/material/Skeleton";
import iconsList from "../components/IconsList";
import AppPageWrapper from "../components/AppPageWrapper";
import { apiRequest } from "../helpers/apiRequest";

export default function LinksPage() {
  const [links, setLinks] = useState([]);
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getLinks = async () => {
    try {
      setLoading(true);
      const data = await apiRequest("/links", "GET");
      setLinks(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) setView(nextView);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar este enlace?")) return;

    try {
      await apiRequest(`/links/${id}`, "DELETE");
      setLinks(links.filter((link) => link._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const renderSkeletons = (count = 6) => {
    return Array.from({ length: count }).map((_, idx) => (
      <Grid item xs={12} sm={6} md={4} key={idx}>
        <Card>
          <Skeleton variant="rectangular" height={80} />
          <CardContent>
            <Skeleton width="80%" />
            <Skeleton width="60%" />
          </CardContent>
          <CardActions>
            <Skeleton variant="text" width={60} />
            <Skeleton variant="text" width={60} />
          </CardActions>
        </Card>
      </Grid>
    ));
  };

  return (
    <AppPageWrapper title="Mis Enlaces">
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          size="small"
        >
          <ToggleButton value="grid">Pilas</ToggleButton>
          <ToggleButton value="list">Lista</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <Grid container spacing={2}>{renderSkeletons()}</Grid>
      ) : links?.length > 0 &&  view === "grid" ? (
        <Grid container spacing={2}>
          {links.map((link) => (
            <Grid item xs={12} sm={6} md={4} key={link._id}>
              <Card>
                <CardContent>
                  {link.icon && (() => {
                    const IconComponent = iconsList[link.icon];
                    return <IconComponent sx={{ mr: 1 }} />;
                  })()}
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {link.group || "Sin grupo"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ wordBreak: "break-all" }}
                  >
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.link}
                    </a>
                  </Typography>
                  {link.comment && (
                    <Typography variant="caption" display="block">
                      {link.comment}
                    </Typography>
                  )}
                  {link.description && (
                    <Typography variant="caption" display="block">
                      {link.description}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={NavLink}
                    to={`/links/edit/${link._id}`}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(link._id)}
                  >
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : links?.length > 0 && view !== "grid" ? (
        <List>
          {links.map((link) => (
            <ListItem
              key={link._id}
              sx={{
                mb: 1,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
              }}
              secondaryAction={
                <Box>
                  <Button
                    size="small"
                    component={NavLink}
                    to={`/links/edit/${link._id}`}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(link._id)}
                  >
                    Eliminar
                  </Button>
                </Box>
              }
            >
              <ListItemText
                primary={link.group || "Sin grupo"}
                secondary={
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.link}
                  </a>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <>
          <Typography variant="h6" component="div">
              No hay enlaces
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/links/new")}
            sx={{ mt: 4 }}
          >
            Crear enlace
          </Button>

        </>
      )}
    </AppPageWrapper>
  );
}
