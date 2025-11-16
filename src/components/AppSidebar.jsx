import { useState } from "react";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";


export default function TheSidebar() {
  const [openNotas, setOpenNotas] = useState(false);
  const [openEnlaces, setOpenEnlaces] = useState(false);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "background.paper",
        color: "text.primary",
        borderRight: "1px solid var(--mui-palette-grey-800)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Menu
      </Typography>
      <List>
        <ListItemButton onClick={() => setOpenEnlaces(!openEnlaces)}>
          <ListItemText primary="Enlaces" />
          {openEnlaces ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openEnlaces} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={NavLink}
              to="/links/all"
              sx={{
                pl: 4,
                "&.active *": { color: "primary.main" }
              }}
            >
              <ListItemText primary="Todos los enlaces" />
            </ListItemButton>

            <ListItemButton
              component={NavLink}
              to="/links/favorites"
              sx={{
                pl: 4,
                "&.active *": { color: "primary.main" }
              }}
            >
              <ListItemText primary="Favoritos" />
            </ListItemButton>

            <ListItemButton
              component={NavLink}
              to="/links/categories"
              sx={{
                pl: 4,
                "&.active *": { color: "primary.main" }
              }}
            >
              <ListItemText primary="Categorías" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => setOpenNotas(!openNotas)}>
          <ListItemText primary="Notas" />
          {openNotas ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openNotas} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            <ListItemButton
              component={NavLink}
              to="/notes/all"
              sx={{
                pl: 4,
                "&.active *": { color: "primary.main" }
              }}
            >
              <ListItemText primary="Todas las notas" />
            </ListItemButton>

            <ListItemButton
              component={NavLink}
              to="/notes/favorites"
              sx={{
                pl: 4,
                "&.active *": { color: "primary.main" }
              }}
            >
              <ListItemText primary="Favoritas" />
            </ListItemButton>

            <ListItemButton
              component={NavLink}
              to="/notes/archived"
              sx={{
                pl: 4,
                "&.active *": { color: "primary.main" }
              }}
            >
              <ListItemText primary="Archivadas" />
            </ListItemButton>

          </List>
        </Collapse>
      </List>
    </Box>
  );
}
