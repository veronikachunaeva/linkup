import Box from '@mui/material/Box';
import { Outlet } from "react-router-dom";
import AppHeader from './AppHeader.jsx'
import AppSidebar from './AppSidebar.jsx'
import AppFooter from './AppFooter.jsx'

export default function AppLayout () {
  return (
    <Box component="section" sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      }}>
        
        <Box sx={{ 
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              height: { xs: "auto", md: "100%" },
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: 240 },
                position: { md: "sticky" }, 
                top: { md: 0 },
                alignSelf: "flex-start",
                height: "100%",
                overflowY: "auto",
              }}
            >
              <AppSidebar />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                borderLeft: {
                  md: "1px solid var(--grey-600)",
                },
              }}
            >
              <AppHeader />
              <Outlet />
            </Box>
          </Box>
        </Box>
        <AppFooter />
    </Box>
  );
}
