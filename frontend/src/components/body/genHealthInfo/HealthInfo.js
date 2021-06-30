import './healthInfo.css';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HeightIcon from '@material-ui/icons/Height';


function generalHealthInfo() {
    return (
           <div className=" body ">
               {
        <Card className="root">
        <div className="details">
          <CardContent className="content">
            <Typography component="h5" variant="h5">
               👣 Weight
            </Typography>
            <div className="margin">
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <LocalHospitalRoundedIcon />
          </Grid>
          <Grid item>
            <TextField  label="KG" />
          </Grid>
          <IconButton aria-label="add" className= "controls">
              <AddCircleOutlineRoundedIcon className="playIcon" />
            </IconButton>
        </Grid>
      </div>
          </CardContent>
        </div>
      </Card>
}
{
       <Card className="root">
       <div className="details">
         <CardContent className="content">
           <Typography component="h5" variant="h5">
            🧍‍♂️ Height
           </Typography>
           <div className="margin">
       <Grid container spacing={1} alignItems="flex-end">
         <Grid item>
           <HeightIcon />
         </Grid>
         <Grid item>
           <TextField  label="cm" />
         </Grid>
         <IconButton aria-label="add" className= "controls">
             <AddCircleOutlineRoundedIcon className="playIcon" />
           </IconButton>
       </Grid>
     </div>
         </CardContent>
       </div>

     </Card>
}
{
        <Card className="root">
        <div className="details">
          <CardContent className="content">
            <Typography component="h5" variant="h5">
              💓 Heart Rate
            </Typography>
            <div className="margin">
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <FavoriteBorderIcon />
          </Grid>
          <Grid item>
            <TextField  label="bpm" />
          </Grid>
          <IconButton aria-label="add" className= "controls">
              <AddCircleOutlineRoundedIcon className="playIcon" />
            </IconButton>
        </Grid>
      </div>
          </CardContent>
        </div>
      </Card>
}
      </div>

    );
}

export default generalHealthInfo; 