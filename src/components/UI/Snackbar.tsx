import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarProps {
  open: boolean;
  severity: AlertColor;
  message: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Snackbars(props: SnackbarProps) {
  const { open, setOpen, severity, message } = props;
  const vertical = "bottom";
  const horizontal = "center";

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical, horizontal }}
      key={"top right"}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}

Snackbars.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  severity: PropTypes.string,
  message: PropTypes.string,
};

export default Snackbars;
