import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";

import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Link,
  Avatar,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { NavLink } from "react-router-dom";
import person_icon from "../public/person-icon.png";
import { deepPurple } from "@material-ui/core/colors";
import ResetPassword from "../containers/ResetPassword";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  link: {
    margin: theme.spacing(1, 1.5),
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
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
}));

function Navbar({ logout, isAuthenticated }) {
  const [redirect, setRedirect] = useState(false);

  const logout_user = () => {
    logout();
    setRedirect(true);
  };

  const guestLinks = () => (
    <Fragment>
     
      <nav>
        <Link
          color="textPrimary"
          href="#"
          className={classes.link}
          component={NavLink}
          to="/signup"
        >
          Register
        </Link>
      </nav>
      <Button
        href="#"
        color="primary"
        variant="outlined"
        className={classes.link}
        component={NavLink}
        to="/login"
      >
        Login
      </Button>
    </Fragment>
  );

  const authLinks = () => (
    <Fragment>
       <Avatar
        src={person_icon}
        alt="User"
        className={classes.small}
        href="#"
        color="primary"
        variant="outlined"
        className={classes.link}
        component={NavLink}
        to="/ResetPassword"
      />
      <Button
        href="#"
        color="primary"
        variant="outlined"
        className={classes.link}
        component={NavLink}
        onClick={logout_user}
        to="/"
      >
        Logout
      </Button>
    </Fragment>
  );
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
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
          {/* <img className={classes.image} src={person_icon} alt="icon" /> */}
          {isAuthenticated ? authLinks() : guestLinks()}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default Navbar;
