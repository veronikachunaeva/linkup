import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import TheNav from "./TheNav.jsx";


export default function AppHeader() {

  return (
    <AppBar
      position="static"
      color="primary" 
      sx={{ 
        mb: 2,
        backgroundColor: "background.paper",
        color: "text.secondary",
        p:1
      }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          component="img"
          src="/logo.png" 
          alt="Logo"
          sx={{ height: 60 }} 
        />

        <TheNav />
      </Toolbar>
    </AppBar>
  );
}
