import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box, Button, TextField, Typography, Select, MenuItem
} from "@mui/material";

import iconsList from "../components/IconsList";
import { apiRequest } from "../helpers/apiRequest";

export default function NewCategoryPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    icon: "",
    color: "#2196f3"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await apiRequest("/categories", "POST", form);

    navigate("/categories");
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Nueva categoría</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          fullWidth
          name="name"
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />

        <Select
          fullWidth
          name="icon"
          value={form.icon}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          {Object.keys(iconsList).map(icon => (
            <MenuItem key={icon} value={icon}>{icon}</MenuItem>
          ))}
        </Select>

        <TextField
          label="Color"
          name="color"
          type="color"
          value={form.color}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button type="submit" variant="contained" fullWidth>
          Crear categoría
        </Button>
      </form>
    </Box>
  );
}
