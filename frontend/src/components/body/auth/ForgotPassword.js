import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
const initialState = {
  email: "",
  err: "",
  success: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async () => {
    if (!isEmail(email))
      return setData({ ...data, err: "Invalid emails.", success: "" });

    try {
      const res = await axios.post("/user/forgot", { email });

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
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
      margin: theme.spacing(12, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    email: {
      maxWidth: "80%",
      marginTop: "40px",
     
    },

    submit: {
      marginTop:"10px",
      width: "100%",
      alignItems:"flex-end",
      background: "#232327",
      color: "white",
      padding:" 10px 30px",
      borderRadius:"3px",
      "&:hover": {
        background: "#232327",
      },  },
 
  }));
  const classes = useStyles();
  return (
    <Grid container component="main" maxwidth="xs">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h3">
            Forgot Your Password?
          </Typography>
          
           
            <TextField
              className={classes.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your email address"
              name="email"
              autoComplete="email"
              type="text"
              autoFocus
              onChange={handleChangeInput}
              value={email}
            />
            <Box flexDirection="row-reverse">
            <Button  variant="contained" 
              color="primary"
              className={classes.submit} onClick={forgotPassword}>
              Verify your email
            </Button>
            </Box>
           
          
        </div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </Grid>
    </Grid>
    // <div className="fg_pass">
    //     <h2>Forgot Your Password?</h2>

    //     <div className="row">
    //         {err && showErrMsg(err)}
    //         {success && showSuccessMsg(success)}

    //         <label htmlFor="email">Enter your email address</label>
    //         <input type="email" name="email" id="email" value={email}
    //         onChange={handleChangeInput} />
    //         <button onClick={forgotPassword}>Verify your email</button>
    //     </div>
    // </div>
  );
}

export default ForgotPassword;
