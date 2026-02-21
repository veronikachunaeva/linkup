import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  Skeleton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { 
  AccessTime,  
  TrendingUp,  
  CheckCircle, 
  Flag, 
} from '@mui/icons-material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import SearchIcon from "@mui/icons-material/Search";
import AppPageWrapper from "../components/AppPageWrapper";
import { apiRequest } from "../helpers/apiRequest";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteNote, setDeleteNote] = useState(null);
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

  const handleDeleteNote = async (id) => {
    try {
      await apiRequest(`/notes/${id}`, "DELETE");
      setNotes(notes.filter((note) => note._id !== id));
      setDeleteNote(null);
    } catch (err) {
      console.error(err);
    }
  };

  const renderSkeletons = () => {
    return (
      <Grid container spacing={2} >
        {[...Array(4)].map((_, idx) => (
          <Grid key={idx}  size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{  borderRadius: 3, p: 2 }}>
              <Skeleton width={50} height={50}  />
              <Skeleton width="80%" sx={{ mt: 2}} />
              <Skeleton width="60%" />
            </Card>
          </Grid>
        ))}
      </Grid>
    )  
  };

  const StatusIcon = ({ status }) => {
  switch(status?.toLowerCase()) {
    case 'pendiente':
      return <AccessTime sx={{ color: 'warning.main', fontSize: 16 }} />;
    case 'en proceso':
    case 'en progreso':
      return <TrendingUp sx={{ color: 'info.main', fontSize: 16 }} />;
    case 'completado':
    case 'complete':
      return <CheckCircle sx={{ color: 'success.main', fontSize: 16 }} />;
    default:
      return <AccessTime sx={{ color: 'text.disabled', fontSize: 16 }} />;
  }
};
const PriorityIcon = ({ priority }) => {
  switch(priority?.toLowerCase()) {
    case 'alta':
      return <Flag sx={{ color: 'error.main', fontSize: 16 }} />;
    case 'media':
      return <Flag sx={{ color: 'warning.main', fontSize: 16 }} />;
    case 'baja':
      return <Flag sx={{ color: 'success.main', fontSize: 16 }} />;
    default:
      return <Flag sx={{ color: 'text.disabled', fontSize: 16 }} />;
  }
};

  const filteredNotes = notes.filter(note =>
    note.title?.toLowerCase().includes(search.toLowerCase()) || 
    note.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppPageWrapper title="Mis Notas">
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ color: "text.secondary"}}>
          Gestión de notas sin esfuerzo
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          placeholder={`Buscar enlace...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            flexGrow: 1,
            "& input": {
              paddingY: 1,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            )
          }}
        />
        <ToggleButtonGroup
          exclusive
          value={view}
          onChange={handleViewChange}
          sx={{
            borderRadius: 3,
            "& .MuiToggleButton-root": {
              px: 2,
              py: 1,
              color: "text.primary",
              "&.Mui-selected": {
                olor: "text.secondary",
              },
            },
          }}
        >
          <ToggleButton value="grid" aria-label="grid view">
            <ViewModuleIcon color='primary'/>
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ViewListIcon color='primary' />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        renderSkeletons()
      ) : notes?.length && view === "grid" ? (
        <Grid container spacing={2}>
          {filteredNotes.map((note) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={note._id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  background: "background.default",
                  borderRadius: "14px",
                  borderLeft: "2px solid",
                  borderColor: 'primary',
                  transition: "0.25s",
                  cursor: "pointer",
                  boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}40`,
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}80`
                  }
                }}
              >
                <CardContent sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {note.title}
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                    {note.description}
                  </Typography>
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 0.5
                  }}>
                    <StatusIcon status={note.status} />
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {note.status}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 0.5
                  }}>
                    <PriorityIcon priority={note.priority} />
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {note.priority}
                    </Typography>
                  </Box>
                  <CardActions sx={{ p: 0, pt: 1, justifyContent: 'flex-end', mt:'auto' }}>
                    <Button
                      component={NavLink}
                      to={`/notes/edit/${note._id}`}
                      variant="outlined"
                      color= 'warning'
                      sx={{marginLeft: 'auto', minWidth: "auto", p: 1}}
                    >
                      <EditIcon  />
                    </Button>
                    <Button
                      variant="outlined"
                      color= 'error'
                      sx={{minWidth: "auto", p: 1}}
                      onClick={() => setDeleteNote(note._id)}
                    >
                      <DeleteIcon  />
                    </Button>
                  </CardActions>
                </CardContent>              
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : filteredNotes?.length && view !== "grid" ? (
        <Box sx={{ mt: 2 }}>
          {filteredNotes.map((note) => (
            <Card
              key={note._id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "background.default",
                borderRadius: "14px",
                borderLeft: "2px solid",
                borderColor: 'primary',
                transition: "0.25s",
                cursor: "pointer",
                boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}40`,
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}80`
                },      
                mb: 2,
              }}
            >
            <CardContent sx={{ position: "relative", width: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent:"space-between", gap: 2 }}>
                <Box>
                  {note?.title && (
                    <Typography variant="h6" sx={{ mb: 1 }}>
                    {note.title}
                  </Typography>
                  )}

                  {note.description && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "fit-content",
                        gap: 0.5,
                        borderRadius: "20px",
                        px: 1.5,
                        py: 0.5,
                        mb: 2
                      }}
                    >
                      <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                        {note.description}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <CardActions sx={{ p: 0, pt: 1, justifyContent: 'flex-end', mt:'auto' }}>
                    <Button
                      component={NavLink}
                      to={`/notes/edit/${note._id}`}
                      variant="outlined"
                      color= 'warning'
                      sx={{marginLeft: 'auto', minWidth: "auto", p: 1}}
                    >
                      <EditIcon  />
                    </Button>
                    <Button
                      variant="outlined"
                      color= 'error'
                      sx={{minWidth: "auto", p: 1}}
                      onClick={() => setDeleteNote(note._id)}
                    >
                      <DeleteIcon  />
                    </Button>
                </CardActions> 
              </Box>
              <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 0.5
                  }}>
                    <StatusIcon status={note.status} />
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {note.status}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 0.5
                  }}>
                    <PriorityIcon priority={note.priority} />
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {note.priority}
                    </Typography>
                  </Box>
            </CardContent>
          </Card>
          ))}
        </Box>
      ) : (
        (
          <>
            <Typography variant="h6" component="div">
                No hay notas
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
      <ConfirmDialog
        open={deleteNote}
        onClose={() => setDeleteNote(null)}
        title={` enlace ${notes.find(note => note._id === deleteNote)?.title}`} 
        onConfirm={() => handleDeleteNote(deleteNote)}
      />
    </AppPageWrapper>
  );
}