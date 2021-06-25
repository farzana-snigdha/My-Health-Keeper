import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import clsx from "clsx";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Link,
  CardHeader,
  Select,
  Avatar,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { NavLink } from "react-router-dom";
import { mainListItems, secondaryListItems } from "./sidebarOptionList";

import Body from "../body/Body";

import { useSelector } from "react-redux";
import axios from "axios";

const drawerWidth = 330;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 20, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    color: "white",
    background: "#424040",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(0),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  link: {
    margin: theme.spacing(10, 15),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  image: {
    margin: theme.spacing(1, 1.5),
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  signinTitle: {
    marginRight: "4%",
    opacity: ".95",
    "&:hover": {
      opacity: "1",
    },
  },
  logout: {
    marginLeft: "14px",
  },
  imageIcon: {
    height: "30px",
    width: "30px",
    transform: "translateY(5px)",
    borderRadius: "50%",
    marginRight: "10px",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  authStyle: {
    marginLeft: "20px",
  },
}));

function Header() {
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const { user, isLogged } = auth;
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <div>
        <Link to="/profile" component={NavLink}>
          {<img className={classes.imageIcon} src={user.avatar} alt="" />}
          {user.name}{" "}
        </Link>

        <Link
          className={classes.logout}
          component={NavLink}
          to="/"
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt"></i>Logout
          {""}
        </Link>
      </div>
    );
  };

  const authLink = () => {
    return (
      <div>
        <Link component={NavLink} to="/signup">
          <i class="fas fa-user-plus"></i> Sign up
        </Link>
        <Link component={NavLink} className={classes.authStyle} to="/login">
          <i class="fas fa-sign-in-alt"></i> Sign in
        </Link>
      </div>
    );
  };

  const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
          color="default"
          elevation={0}
        >
          <Toolbar className={classes.toolbar}>
            {" "}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              <Link
                component={NavLink}
                to="/"
                underline="none"
                color="textPrimary"
              >
                My HealthKeeper
              </Link>
            </Typography>
            <Typography className={classes.signinTitle} color="inherit">
              <ul style={transForm}>{isLogged ? userLink() : authLink()}</ul>
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              {" "}
              <font color="white">
                <ChevronLeftIcon />
              </font>
            </IconButton>
          </div>
          <Divider />
          {isLogged ? (
            <List>{mainListItems}</List>
          ) : (
            <font size="5">sign in first</font>
          )}
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="" className={classes.container}>
            <Body />
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default Header;
