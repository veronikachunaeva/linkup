import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box, Button, Card, CardContent, Grid,
  Typography, TextField, Select, MenuItem
} from "@mui/material";

import { apiRequest } from "../helpers/apiRequest";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const navigate = useNavigate();

  const load = async () => {
    const data = await apiRequest("/categories", "GET");
    setCategories(data.data);
  };

  useEffect(() => { load(); }, []);

  const filtered = categories
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "count") return b.count - a.count;
    });

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar categoría?")) return;

    await apiRequest(`/categories/${id}`, "DELETE");
    load();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <TextField
          label="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 200 }}
        />

        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <MenuItem value="name">Nombre</MenuItem>
          <MenuItem value="count">Cantidad de enlaces</MenuItem>
        </Select>

        <Button variant="contained" onClick={() => navigate("/categories/new")}>
          Nueva categoría
        </Button>
      </Box>

      <Grid container spacing={2}>
        {filtered.map(cat => (
          <Grid item xs={12} sm={6} md={4} key={cat._id}>
            <Card sx={{ borderLeft: `6px solid ${cat.color}` }}>
              <CardContent>

                <Typography variant="h6">
                  {cat.icon ? cat.icon + " " : ""} {cat.name}
                </Typography>

                <Typography variant="body2">
                  {cat.count} enlaces
                </Typography>

                <Button
                  color="error"
                  onClick={() => handleDelete(cat._id)}
                >
                  Eliminar
                </Button>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
