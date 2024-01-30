import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const theme = createTheme();

function Signin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({
      ...user, //spread operator
      [name]: value,
    });
  };

  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/login", user);

      if (res.data && res.data.status === 200 && res.data.result) {
        const { user, token } = res.data.result;

        if (token) {
          toast.success("Login successfull...!");
          localStorage.setItem("usersdatatoken", token);
          localStorage.setItem("usersData", JSON.stringify(user));
          history("/");
          return;
        }
      }
      // toast.error("Token not found in the response");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(
          "Invalid email or password. Please enter correct credentials."
        );
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {" "}
              <LockOutlinedIcon />{" "}
            </Avatar>
            <Typography component="h1" variant="h5">
              {" "}
              Sign in{" "}
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                value={user.email}
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={user.password}
                label="Password"
                type="password"
                autoComplete="new-password"
                onChange={handleChange}
                autoFocus
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {" "}
                    Forgot password?{" "}
                  </Link>
                </Grid>
                <Grid item>
                  <NavLink
                    className="link"
                    to="/signup"
                    style={{
                      color: "#2979ff",
                      textDecoration: "none",
                      fontSize: "15px",
                    }}
                  >
                    {" "}
                    Don't have an account? Sign Up
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
export default Signin;
