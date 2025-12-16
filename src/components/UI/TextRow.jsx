import {
  Box,
  Typography,
} from "@mui/material";

export default function TextRow({ label, value }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography fontWeight={500}>{value}</Typography>
    </Box>
  );
}