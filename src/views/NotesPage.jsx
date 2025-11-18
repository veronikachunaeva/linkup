import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Skeleton from "@mui/material/Skeleton";

import AppPageWrapper from "../components/AppPageWrapper";
import { apiRequest } from "../helpers/apiRequest";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getNotes = async () => {
    try {
      setLoading(true);
      const data = await apiRequest("/notes", "GET");
      setNotes(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) setView(nextView);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta nota?")) return;

    try {
      await apiRequest(`/notes/${id}`, "DELETE");
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const renderSkeletons = (count = 6) => {
    return Array.from({ length: count }).map((_, idx) => (
      <Grid item xs={12} sm={6} md={4} key={idx}>
        <Card>
          <Skeleton variant="rectangular" height={80} />
          <CardContent>
            <Skeleton width="80%" />
            <Skeleton width="60%" />
          </CardContent>
          <CardActions>
            <Skeleton variant="text" width={60} />
            <Skeleton variant="text" width={60} />
          </CardActions>
        </Card>
      </Grid>
    ));
  };

  return (
    <AppPageWrapper title="Mis Notas">
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          size="small"
        >
          <ToggleButton value="grid">Pilas</ToggleButton>
          <ToggleButton value="list">Lista</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <Grid container spacing={2}>{renderSkeletons()}</Grid>
      ) : notes?.length && view === "grid" ? (
        <Grid container spacing={2}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {note.title}
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                    {note.description}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Estado: {note.status} | Prioridad: {note.priority}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Creado: {new Date(note.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={NavLink}
                    to={`/notes/edit/${note._id}`}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(note._id)}
                  >
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : notes?.length && view !== "grid" ? (
        <List>
          {notes.map((note) => (
            <ListItem
              key={note._id}
              sx={{
                mb: 1,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
              }}
              secondaryAction={
                <Box>
                  <Button
                    size="small"
                    component={NavLink}
                    to={`/notes/edit/${note._id}`}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(note._id)}
                  >
                    Eliminar
                  </Button>
                </Box>
              }
            >
              <ListItemText
                primary={note.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      {note.description}
                    </Typography>
                    <Typography component="span" variant="caption" display="block">
                      Estado: {note.status} | Prioridad: {note.priority}
                    </Typography>
                    <Typography component="span" variant="caption" display="block">
                      Creado: {new Date(note.createdAt).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        (
          <>
            <Typography variant="h6" component="div">
                No hay enlaces
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/notes/new")}
              sx={{ mt: 4 }}
            >
              Crear nota
            </Button>
  
          </>
        )
      )}
    </AppPageWrapper>
  );
}

// import {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
// const TheNotes = () => {

//   const [ notes, setNotes] = useState([]);

//   const getNotes = async () => {
//     const res = await fetch('https://linknote.onrender.com/api/notes');
//     const json = await res.json();
//     const {data} = json;
//     setNotes([...notes, ...data])
//   }

//   useEffect(() => {
//     getNotes();
//   }, []);
//   return ( 
//     <div>
//       <h1>Notes</h1>

//       <div>
//         <ul>
//           { notes.map(note => <li key={note._id}>
//             <dl>
//               <dt>Titulo</dt><dd>{note.title}</dd>
//               <dt>Descripcion</dt><dd>{note.description}</dd>
//               <dt>Estado</dt><dd>{note.status}</dd>
//               <dt>Prioridad</dt><dd>{note.priority}</dd>
//             </dl>
//           </li>) }
//         </ul>
//       </div>
//     </div>
//    );
// }
 
// export default TheNotes;