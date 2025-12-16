
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        px: 3,
        borderTop: "1px solid var(--grey-600)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "text.primary",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Link Note App
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Typography
          variant="body2"
          sx={{ "&:hover": { color: "primary.main", cursor: "pointer" } }}
        >
          Privacy
        </Typography>

        <Typography
          variant="body2"
          sx={{ "&:hover": { color: "primary.main", cursor: "pointer" } }}
        >
          Terms
        </Typography>

        <Typography
          variant="body2"
          sx={{ "&:hover": { color: "primary.main", cursor: "pointer" } }}
        >
          Contact
        </Typography>
      </Box>
    </Box>
  );
}
