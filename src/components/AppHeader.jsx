import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import TheNav from "./TheNav.jsx";


export default function AppHeader() {

  return (
    <AppBar
      position="static"
      sx={{ 
        color: "text.secondary",
        p:1,
        borderBottom: "1px solid var(--grey-600)",
        borderRadius: 0,
        '--Paper-shadow': 'none !important',
        '--Paper-overlay': 'none !important',
        '--AppBar-background': 'f5f5f5',

      }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignSelf:" end" }}>
        <TheNav />
      </Toolbar>
    </AppBar>
  );
}
