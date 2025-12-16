import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button
} from "@mui/material";

export default function ConfirmDialog({ open, onClose, onConfirm, title }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar acción</DialogTitle>
      <DialogContent>
        ¿Seguro que deseas eliminar {title}?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="error" onClick={onConfirm}>Eliminar</Button>
      </DialogActions>
    </Dialog>
  );
}
