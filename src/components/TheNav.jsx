import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AddIcon from '@mui/icons-material/Add';
import Person2Icon from '@mui/icons-material/Person2';

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
      
        {!user && <Button
          color="inherit"
          component={NavLink}
          to="/login"
          startIcon={<LoginIcon color='primary' />}
        >
          Login
        </Button>}
        {!user && (
          <Button
            color="inherit"
            component={NavLink}
            to="/register"
            startIcon={<AppRegistrationIcon color='primary' />}
          >
            Register
          </Button>
        )}
        {user && (
          <Button
            color="inherit"
            component={NavLink}
            to="/links/new"
            startIcon={<AddIcon color="primary" />}
          >
            Enlace
          </Button>
        )}
        {user && (
          <Button
            color="inherit"
            component={NavLink} 
            to="/notes/new"
            startIcon={<AddIcon color="primary" />}
          >
            Nota
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
            <Typography variant="body1" sx={{ mr: 2, color: "text.primary" }}>
                {user.name}
              </Typography>
            <AccountCircleIcon sx={{ width: 36, height: 36 }} />
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
            to="/profile"
          >
            <ListItemIcon>
              <Person2Icon color="primary" fontSize="small" />
            </ListItemIcon>
            Mi Perfil
          </MenuItem>
          <Divider />
          <MenuItem onClick={ () => handleLogout() } >
            <ListItemIcon>
              <Logout color="primary" fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </nav>
  );
}