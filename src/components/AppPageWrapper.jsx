import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AppPageWrapper ({ title, children }) {
  return (
    <Box
      sx={{
        maxWidth: "1000px",
        flex: 1,
        borderRadius: 1,
        py: { xs: 2, md: 3 },
        px: { xs: 2, md: 3 },
        backgroundColor: "background.paper",
        color: "text.primary",
      }}
    >
      {title && (
        <Typography
          variant="h1"
          sx={{
            fontWeight: 600,
            mb: 1,
          }}
        >
          {title}
        </Typography>
      )}
      <Box  >{children}</Box>
    </Box>
  );
}
