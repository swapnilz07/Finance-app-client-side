import React from "react";
import { Paper, Typography, makeStyles } from "@material-ui/core";
import { Box } from "@mui/material";
import { LoginContext } from "./ContextProvider/Context";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    margin: "auto",
    maxWidth: 600,
    textAlign: "center",
    marginTop: "100px",
  },
  firstBox: {
    borderBottom: "1px solid black",
  },
  secondBox: {
    paddingTop: "20px",
    paddingLeft: "25px",
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  userInfo: {
    marginBottom: theme.spacing(1),
    textAlign: "start",
  },
}));

const Profile = () => {
  const classes = useStyles();

  const { loginData } = React.useContext(LoginContext);

  return (
    <Paper className={classes.paper} elevation={3}>
      <Box className={classes.firstBox}>
        <Typography variant="h5" className={classes.title}>
          User Profile
        </Typography>
      </Box>
      <Box className={classes.secondBox}>
        <Typography variant="body1" className={classes.userInfo}>
          First Name :{" "}
          <strong>{loginData ? loginData.validUserOne.firstname : ""}</strong>
        </Typography>
        <Typography variant="body1" className={classes.userInfo}>
          Last Name :{" "}
          <strong>{loginData ? loginData.validUserOne.lastname : ""}</strong>
        </Typography>
        <Typography variant="body1" className={classes.userInfo}>
          Contact Number :{" "}
          <strong>
            {loginData ? loginData.validUserOne.contact_number : ""}
          </strong>
        </Typography>
        <Typography variant="body1" className={classes.userInfo}>
          Email Address :{" "}
          <strong>{loginData ? loginData.validUserOne.email : ""}</strong>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Profile;
