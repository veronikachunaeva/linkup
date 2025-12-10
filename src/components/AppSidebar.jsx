import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';
import AddLinkIcon from '@mui/icons-material/AddLink';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';


export default function TheSidebar() {
  const [openNotas, setOpenNotas] = useState(false);
  const [openEnlaces, setOpenEnlaces] = useState(false);
  const { user } = useContext( AuthContext);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "background.paper",
        color: "text.primary",
        borderRight: "1px solid var(--mui-palette-grey-800)",
      }}
    >
        <Button 
          color="inherit"
          component={NavLink}
          to="/"
          startIcon={<HomeIcon />}
          sx={{ width: '100%', justifyContent:'flex-start', gap: 3 }}
        >
          Inicio
        </Button>
        {user && (<Button 
          color="inherit"
          startIcon={<AddLinkIcon />}
          component={NavLink}
          to="/categories"
          sx={{ width: '100%', justifyContent:'flex-start', gap: 3 }}
        >
          Mis categorías
        </Button>
        )}
        {user && (<Button 
          color="inherit"
          startIcon={<AddLinkIcon />}
          component={NavLink}
           to="/links/all"
           sx={{ width: '100%', justifyContent:'flex-start', gap: 3 }}
        >
          Mis enlaces
        </Button>
        )}
        {user && (<Button 
          color="inherit"
          startIcon={<TextSnippetIcon />}
          component={NavLink}
           to="/notes/all"
           sx={{ width: '100%', justifyContent:'flex-start', gap: 3 }}
        >
          Mis notas
        </Button>
        )}
    </Box>
  );
}
