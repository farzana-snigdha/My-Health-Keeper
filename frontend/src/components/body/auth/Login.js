import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { GoogleLogin } from "react-google-login";

import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/home");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/home");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage:
        "url(https://media.istockphoto.com/photos/healthy-eating-exercising-weight-and-blood-pressure-control-picture-id1280587810?b=1&k=6&m=1280587810&s=170667a&w=0&h=rhieqbyXq1Lbkqa_6_8et5n6i3zhJQ5qkE7nUnm3Gy0=)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "#232327",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      marginTop: "24px",
      // margin: theme.spacing(4, 14, 1),
      width: "60%",
      background: "#232327",
      color: "white",
      "&:hover": {
        background: "#122221",
      },
    },
    fontColor: {
      color: "#122221",
    },
    google: {
     
      justifyContent: "center",
      width: "60%",
      background: "#232327",
      color: "white",
      "&:hover": {
        background: "#122221",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Grid container component="main" maxwidth="xs">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="text"
              autoFocus
              onChange={handleChangeInput}
              value={email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChangeInput}
              value={password}
            />
            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            /> */}
            <Typography align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onSubmit={handleSubmit}
              >
                Sign In
              </Button>
            </Typography>
            <Typography className={classes.fontColor}>
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={4}>
                  <Link href="/forgot_password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"New? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Typography>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "6vh" }}
            >
              <Grid item xs={3}>
                OR
              </Grid>
            </Grid>
            <Typography align="center">
              <GoogleLogin
                className={classes.google}
                theme="dark"
                clientId="129566980089-n76f07ukaj2i64bm38o5v1d8e504umjp.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </Typography>
            {/* <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.google}
              onClick={continueWithGoogle}
            >
              Continue With Google
            </Button> */}
          </form>
        </div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default Login;
