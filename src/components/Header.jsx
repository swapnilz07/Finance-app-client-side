import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { LoginContext } from "./ContextProvider/Context";
import { Avatar } from "@mui/material";
import axios from "axios";
import { validateUser } from "../api/auth/Authroutes";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const auth = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const SidebarData = [
    { title: "Home", path: "/", icon: <HomeIcon /> },
    { title: "About", path: "/about", icon: <InfoIcon /> },
    { title: "Contact", path: "/contact", icon: <ContactsIcon /> },
    { title: "Survices", path: "/services", icon: <SupportAgentIcon /> },
  ];

  const sbloanpages = [
    { title: "Secure", path: "/secured", icon: <AssuredWorkloadIcon /> },
    { title: "Unsecure", path: "/unsecured", icon: <LockOpenIcon /> },
  ];

  const { loginData, setLoginData } = React.useContext(LoginContext);

  const history = useNavigate();

  const homeValid = async () => {
    const res = await validateUser();

    console.log("response data ==>>", res);

    if (res && res.status !== 500 && res) {
      setLoginData(res);
    } else {
      history("/signin");
    }
  };

  React.useEffect(() => {
    homeValid();
  }, []);

  console.log("login data header ==>>", loginData);

  const logOutUser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await axios.get("/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (res.data.status === 200) {
      console.log("user logged out");
      localStorage.removeItem("usersdatatoken");
      localStorage.removeItem("usersData");
      setLoginData(false);
      history("/signin");
    } else {
      console.log("error");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span>S</span>wap
            <span>F</span>finance
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {loginData.validUserOne ? (
                  <Avatar
                    style={{
                      background: "#0b6bcb",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {loginData.validUserOne.firstname[0].toUpperCase()}
                    {loginData.validUserOne.lastname[0].toUpperCase()}
                  </Avatar>
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {loginData.validUserOne ? (
                  <>
                    <MenuItem onClick={handleClose}>
                      {/* Render Profile link if logged in */}
                      <NavLink
                        style={{ textDecoration: "none" }}
                        to="/userprofile"
                      >
                        Profile
                      </NavLink>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logOutUser();
                        handleClose();
                      }}
                    >
                      Sign Out
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={handleClose}>
                    {/* Render Sign In link if not logged in */}
                    <NavLink style={{ textDecoration: "none" }} to="/signin">
                      Sign In
                    </NavLink>
                  </MenuItem>
                )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {SidebarData.map((data) => (
          <NavLink
            to={data.path}
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItem
                onClick={handleDrawerClose}
                disablePadding
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "rgb(54, 54, 54, 0.29)",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon> {data.icon}</ListItemIcon>
                  <ListItemText primary={data.title} />
                </ListItemButton>
              </ListItem>
            </List>
          </NavLink>
        ))}
        <Divider />
        {sbloanpages.map((data) => (
          <NavLink
            to={data.path}
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItem
                onClick={handleDrawerClose}
                disablePadding
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "rgb(54, 54, 54, 0.29)",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon> {data.icon}</ListItemIcon>
                  <ListItemText primary={data.title} />
                </ListItemButton>
              </ListItem>
            </List>
          </NavLink>
        ))}
      </Drawer>
      <Main open={open}></Main>
    </Box>
  );
}
