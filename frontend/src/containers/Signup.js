import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Link,
  Grid,
  Typography,
  FormControl,
  Select,
  Container,
  InputLabel,
  Avatar,
  Button,
  CssBaseline,
  TextField,
} from "@material-ui/core";
require("dotenv").config();
const URL = process.env.URL;

function Signup() {
  const [accountCreated, setAccountCreated] = useState(false);
   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [re_pass, setRePass] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

 
  const history = useHistory();

  async function register(e) {
    e.preventDefault();
    try {
  
        const registerData = {
          name,
          email,
          pass,
          re_pass,
          gender,
          phone,
        };
     
        await axios.post("http://localhost:5000/users/signup", registerData);
        setAccountCreated(true);

        // await getLoggedIn();
         history.push("/dashboard");
     
    } catch (err) {
      console.error("ghg     " + err);
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    formControl: {
      minWidth: 130,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },

    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();



 

  if (accountCreated) {
    //  localStorage.setItem('jwt', jwt)
    // console.log(localStorage.getItem("access"));
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={register}>
          <div className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="User Name"
                  name="name"
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Grid>

              <Grid item xs={5}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    id="gender"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    label="Gender"
                  >
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                    <option value={"Others"}>Others</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Contact Number"
                  name="phone"
                  autoComplete="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                  minLength="6"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="re_password"
                  label="Retype Password"
                  type="password"
                  id="re_password"
                  autoComplete="current-password"
                  onChange={(e) => setRePass(e.target.value)}
                  value={re_pass}
                  minLength="6"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // onClick={continueWithGoogle}
            >
              Continue With Google
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Signup;
