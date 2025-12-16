import { Snackbar, Alert } from "@mui/material";

export default function FeedbackMessage({ message, severity, onClose }) {
  return (
    <Snackbar open={!!message} autoHideDuration={3000} onClose={onClose}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}
