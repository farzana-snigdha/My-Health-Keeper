import React from "react";
import ReactDOM from "react-dom";
import AnimatedBg from "react-animated-bg";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import {Button,Typography,Link}  from '@material-ui/core';

function LandingPage() {
  const imagesList = [
    'url("https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?cs=srgb&dl=pexels-jane-d-1128678.jpg&fm=jpg")',
    'url("https://images.pexels.com/photos/1172019/pexels-photo-1172019.jpeg?cs=srgb&dl=pexels-lisa-1172019.jpg&fm=jpg")',
    'url("https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4386467.jpg&fm=jpg")',
    'url("https://images.pexels.com/photos/39671/physiotherapy-weight-training-dumbbell-exercise-balls-39671.jpeg?cs=srgb&dl=pexels-pixabay-39671.jpg&fm=jpg")'
  ];
  const useStyles = makeStyles((theme) => ({
    mmm: {
       
        color: "black",
        padding: "20%",
      },
    image: {
           backgroundRepeat: "no-repeat",
         backgroundSize: "cover",
      backgroundPosition: "center",
    },
 button:{
     marginTop:"1%",
     background:"white",
     color:"black"
 }
  
  }));

  const classes = useStyles();
  return (
    <div>
    
      <AnimatedBg
        colors={imagesList}
        duration={3}
        delay={2}
        timingFunction="ease-out"
        className={classes.image}
      >
        <div className={classes.mmm}>
            <Typography variant="h3"
            fontWeight="bold">
            START YOUR JOURNEY 
            </Typography>
         
          
         
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        
      >
           <Link
                component={NavLink}
                to="/login"
                underline="none"
                color="textPrimary"
              >
 Sign in
              </Link>
       
      </Button>
        </div>
      </AnimatedBg>
    </div>
  );
}
export default LandingPage