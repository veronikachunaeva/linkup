import { useEffect, useState } from "react";
import {
  Box, Table, TableHead, TableRow, TableCell,
  TableBody, Avatar, IconButton, Select, MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiRequest } from "../helpers/apiRequest";
import ConfirmDialog from "../components/ConfirmDialog";
import FeedbackMessage from "../components/FeedbackMessage";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest("/users").then(res => setUsers(res.data));
  }, []);

  const changeRole = async (id, rol) => {
    await apiRequest(`/users/${id}`, "PUT", { rol });
    setUsers(u => u.map(x => x._id === id ? { ...x, rol } : x));
    setMessage({ text: "Rol actualizado", type: "success" });
  };

  const confirmDelete = async () => {
    await apiRequest(`/users/${deleteId}`, "DELETE");
    setUsers(u => u.filter(x => x._id !== deleteId));
    setDeleteId(null);
    setMessage({ text: "Usuario eliminado", type: "success" });
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Tel</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.tel || "-"}</TableCell>
              <TableCell>
                <Select
                  value={user.rol}
                  size="small"
                  onChange={e => changeRole(user._id, e.target.value)}
                >
                  <MenuItem value="cliente">Cliente</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => navigate(`/users/${user._id}`)}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton onClick={() => navigate(`/users/${user._id}/edit`)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => setDeleteId(user._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />

      <FeedbackMessage
        message={message?.text}
        severity={message?.type}
        title=' este usuario'
        onClose={() => setMessage(null)}
      />
    </Box>
  );
}
