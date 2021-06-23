import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";

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

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { NavLink } from "react-router-dom";
import person_icon from "../../public/person-icon.png";
import { deepPurple } from "@material-ui/core/colors";

import { useSelector } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
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
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  signinTitle: {
    marginRight: "8px",
    opacity: ".95",
    "&:hover": {
      opacity: "1",
    },
  },
  logout:{
    marginLeft:"20px"
  },
  imageIcon:{
    height:"30px",
    width:"30px",
    transform:"translateY(5px)",
    borderRadius:"50%",
    marginRight:"8px"
  }
  
}));

function Header() {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;

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
        <Link to="#" component={NavLink}>
          {<img className={classes.imageIcon} src={user.avatar} alt="" />}
          {user.name}{" "}
        </Link>

        
        <Link className={classes.logout} component={NavLink} to="/" onClick={handleLogout} >
        <i class="fas fa-sign-out-alt"></i>
          Logout
        </Link>
      </div>
    );
  };

  const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };

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
          {/* <img className={classes.image} src={person_icon} alt="icon" /> */}
          {/* {isAuthenticated ? authLinks() : guestLinks()} */}
          <Typography className={classes.signinTitle} color="inherit">
            {/* <li>
                  <Link component={NavLink} underline="none" to="/login">
                    <i className="fas fa-user"></i> Sign in
                  </Link>
                </li> */}
            <ul style={transForm}>
              {isLogged ? (
                userLink()
              ) : (
                
                  <Link component={NavLink}  to="/login">
                    <i className="fas fa-user"></i> Sign in
                  </Link>
                
              )}
            </ul>
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default Header;
