// import makeStyles from "@mui/styles/makeStyles";
import { Alert, AlertTitle } from "@mui/material";
import { useEffect } from "react";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     position: "fixed",
//     // right: theme.spacing(2),
//     // bottom: theme.spacing(2),
//     zIndex: 2000, // Make sure it pops up on top of everything
//   },
//   alert: {
//     marginBottom: theme.spacing(2),
//   },
// }));

const AlertProvider = ({ duration = 1000, alert, actions }) => {
  // const classes = useStyles();
  const handleClose = () => {
    actions.removeAlert(alert);
  };
  useEffect(() => {
    // run handleClose once duration is finished.
    const timer = setTimeout(handleClose, duration);
    return function () {
      clearTimeout(timer);
    };
  }, []);
  return (
    <Alert
      onClose={handleClose}
      id="alert"
      elevation={6}
      variant="filled"
      severity={alert.type}
    >
      <AlertTitle>{alert.title}</AlertTitle>
      {alert.text}
    </Alert>
  );
};
export default AlertProvider;
