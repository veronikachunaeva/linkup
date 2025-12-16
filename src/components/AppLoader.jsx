import { Box, CircularProgress } from "@mui/material";

export default function AppLoader() {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={56} thickness={4} />
    </Box>
  );
}
