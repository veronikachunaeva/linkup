import Box from '@mui/material/Box';
import { Outlet } from "react-router-dom";
import AppHeader from './AppHeader.jsx'
import AppSidebar from './AppSidebar.jsx'
import AppFooter from './AppFooter.jsx'

export default function AppLayout () {
  return (
    <Box component="section" sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      }}>
        <AppHeader />
        <Box sx={{ flex: 1, mb: 2 }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              height: { xs: "auto", md: "100%" },
              gap: 2,
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
                borderRadius: 1,
                borderRight: {
                  md: "1px solid var(--mui-palette-grey-800)",
                },
                borderBottom: {
                  xs: "1px solid var(--mui-palette-grey-800)",
                  md: "none",
                },
                backgroundColor: "background.paper",
              }}
            >
              <AppSidebar />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
        <AppFooter />
    </Box>
  );
}
