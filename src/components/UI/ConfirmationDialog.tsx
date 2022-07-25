import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertDialogProps {
  open: boolean;
  handleClose: () => void;
  data: string;
  handleClickOpen: () => void;
  saveChanges: (callBack: () => void, data: string) => void;
}

export default function AlertDialog(props: AlertDialogProps) {
  const { open, data, handleClose, saveChanges } = props;

  const confirm = () => {
    saveChanges(handleClose, data);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this entry?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={confirm} variant="contained" color="error" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
