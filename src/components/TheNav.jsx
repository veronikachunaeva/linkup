import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export default function TheNav () {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user, logout } = useContext( AuthContext);

  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout()
    navigate('/login');
  }

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    }
  return (  
    <nav>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button 
          color="inherit"
          component={NavLink}
          to="/"
        >
          Inicio
        </Button>
        {!user && <Button
          color="inherit"
          component={NavLink}
          to="/login"
        >
          Login
        </Button>}
        {!user && (
          <Button color="inherit" component={NavLink} to="/register">
            Register
          </Button>
        )}
        {user && (
          <Button
            color="inherit"
            component={NavLink}
            to="/profile"
          >
            Mi Perfil
          </Button>
        )}

        {user && (
          <Button
            onClick={ handleAvatarClick }
            size="small"
            sx={{ p: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Typography variant="body1" sx={{ fontWeight: 500, mr: 1 }}>
                {user.name}
              </Typography>
            <Avatar sx={{ width: 36, height: 36 }}>M</Avatar>
          </Button>
        )}

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              ml:1,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            component={NavLink}
            to="/links/all"
          >
            Mis enlaces
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/notes/all"
          >
            Mis notas
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={ () => handleLogout() } >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </nav>
  );
}